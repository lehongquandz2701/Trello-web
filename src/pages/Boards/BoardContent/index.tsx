import { cloneDeep, isEmpty } from "lodash";
import { BoardItem, MediaCard } from "~/components";
import background from "~/assets/image/bg.png";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TBoard, TCards, TColumns } from "~/utilities/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { mapOrder } from "~/hepler";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  DndContext,
  DragEndEvent,
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  MouseSensor,
  KeyboardSensor,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DragOverEvent,
  closestCorners,
  pointerWithin,
  rectIntersection,
  Active,
  ClientRect,
  DroppableContainer,
  getFirstCollision,
  Collision,
  UniqueIdentifier,
  closestCenter,
} from "@dnd-kit/core";
import { RectMap } from "@dnd-kit/core/dist/store";
import { Coordinates } from "@dnd-kit/utilities";

type TBoardContentProps = {
  board: TBoard;
};

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = ({ board }: TBoardContentProps) => {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
    pointerSensor
  );

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  const [columnData, setColumnData] = useState<TColumns[]>([]);

  const [activeDragItemData, setActiveDragItemData] = useState({
    activeId: "",
    type: "",
    data: {} as any,
  });

  const oldColumnWhenDraggingCard = useRef<TColumns | undefined>(
    {} as TColumns
  );
  const lastOverId = useRef<UniqueIdentifier>("");

  const onHandleDrag = useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e;

      if (!active || !over) return;

      if (activeDragItemData.type === ACTIVE_DRAG_ITEM_TYPE.CARD) {
        const activeColumn = findColumnByCardId(e.active.id as string);
        const overColumn = findColumnByCardId(e.over?.id as string);
        if (!activeColumn || !overColumn) return;

        //action drag card

        if (oldColumnWhenDraggingCard.current?._id === overColumn?._id) {
          const oldCardIndex =
            oldColumnWhenDraggingCard.current?.cards.findIndex(
              (c: TCards) => c._id === activeDragItemData.activeId
            );

          const newCardIndex = overColumn.cards.findIndex(
            (c) => c._id === over?.id
          );

          const dndOrderedCard = arrayMove(
            oldColumnWhenDraggingCard.current?.cards ?? [],
            oldCardIndex ?? 0,
            newCardIndex
          );

          setColumnData((prev) => {
            const nextColumn = cloneDeep(prev);
            const targetColumn = nextColumn.find(
              (c) => c._id === overColumn._id
            );
            if (targetColumn) {
              targetColumn.cards = dndOrderedCard;
              targetColumn.cardOrderIds = dndOrderedCard.map((i) => i._id);
            }

            return nextColumn;
          });
        }
      } else {
        //action save drag in column

        if (active.id !== over?.id) {
          const oldIndex = columnData.findIndex((c) => c._id === active.id);

          const newIndex = columnData.findIndex((c) => c._id === over?.id);

          const newColumnData = arrayMove(columnData, oldIndex, newIndex);
          setColumnData(newColumnData);
        }
      }

      setActiveDragItemData({
        activeId: "",
        type: "",
        data: {},
      });
      oldColumnWhenDraggingCard.current = {} as TColumns;
    },
    [columnData, setColumnData, activeDragItemData]
  );

  const findColumnByCardId = useCallback(
    (cardId: string) => {
      const data = columnData.find((i) =>
        i.cards.map((j) => j._id).includes(cardId)
      );

      return data;
    },
    [columnData]
  );

  const onHandleDragStart = useCallback(
    (e: DragStartEvent) => {
      setActiveDragItemData((prev) => ({
        ...prev,
        activeId: e.active.id as string,
        type: e.active.data.current?.columnId
          ? ACTIVE_DRAG_ITEM_TYPE.CARD
          : ACTIVE_DRAG_ITEM_TYPE.COLUMN,
        data: e.active.data.current as any,
      }));

      if (e.active.data?.current?.columnId) {
        oldColumnWhenDraggingCard.current = findColumnByCardId(
          e.active.id as string
        );
      }
    },
    [setActiveDragItemData, findColumnByCardId]
  );

  const collisionDropAnimation = useCallback(
    (args: {
      active: Active;
      collisionRect: ClientRect;
      droppableRects: RectMap;
      droppableContainers: DroppableContainer[];
      pointerCoordinates: Coordinates | null;
    }): Collision[] => {
      if (activeDragItemData.type === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }

      const pointerCollisions = pointerWithin(args);

      const intersection = !!pointerCollisions.length
        ? pointerCollisions
        : rectIntersection(args);

      let firstCollisionId = getFirstCollision(intersection, "id");

      if (firstCollisionId) {
        const checkColumn = columnData.find(
          (column) => column._id === firstCollisionId
        );

        if (checkColumn) {
          const filteredContainers = args.droppableContainers.filter(
            (container) =>
              container.id !== firstCollisionId &&
              checkColumn.cardOrderIds.includes(container.id as string)
          );

          if (filteredContainers.length > 0) {
            const closestCollisions = closestCenter({
              ...args,
              droppableContainers: filteredContainers,
            });

            if (closestCollisions.length > 0) {
              firstCollisionId = closestCollisions[0].id;
            }
          }
        }

        lastOverId.current = firstCollisionId;

        return [{ id: firstCollisionId }];
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemData, columnData]
  );
  const onHandleDragOver = useCallback(
    (e: DragOverEvent) => {
      if (activeDragItemData.type === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

      const { active, over } = e;

      if (!active || !over) return;

      const activeColumn = findColumnByCardId(e.active.id as string);
      const overColumn = findColumnByCardId(e.over?.id as string);

      if (!activeColumn || !overColumn) return;

      if (activeColumn._id !== overColumn._id) {
        setColumnData((prev) => {
          const overCardIndex = overColumn.cards.findIndex(
            (card) => card._id === over.id
          );

          let newCardIndex;
          const isBellowOverItem =
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;

          const modifier = isBellowOverItem ? 1 : 0;

          newCardIndex =
            overCardIndex >= 0
              ? overCardIndex + modifier
              : overColumn.cards.length + 1;

          const nextColumn = cloneDeep(prev);
          const nextActiveColumn = nextColumn.find(
            (column) => column._id === activeColumn._id
          );
          const nextOverColumn = nextColumn.find(
            (column) => column._id === overColumn._id
          );

          if (nextActiveColumn) {
            nextActiveColumn.cards = nextActiveColumn.cards.filter(
              (i) => i._id !== e.active.id
            );

            if (isEmpty(nextActiveColumn.cards)) {
              nextActiveColumn.cards.push({
                _id: `${nextActiveColumn._id}-placeholder-card`,
                boardId: nextActiveColumn.boardId,
                columnId: nextActiveColumn._id,
                FE_PlaceholderCard: true,
              });
            }

            nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
              (card) => card._id
            );
          }

          if (nextOverColumn) {
            nextOverColumn.cards = nextOverColumn.cards.filter(
              (i) => i._id !== e.active.id
            );

            const rebuild_activeDraggingCardData = {
              ...e.active.data?.current,
              columnId: nextOverColumn._id,
            };

            nextOverColumn.cards = [
              ...nextOverColumn.cards.slice(0, newCardIndex),
              rebuild_activeDraggingCardData as TCards,
              ...nextOverColumn.cards.slice(newCardIndex),
            ];

            nextOverColumn.cards = nextOverColumn.cards.filter(
              (card) => !card.FE_PlaceholderCard
            );

            nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
              (card) => card._id
            );
          }

          return nextColumn;
        });
      }
    },
    [activeDragItemData, findColumnByCardId, setActiveDragItemData]
  );

  useEffect(() => {
    const newArray = mapOrder(board.columns, board.columnOrderIds, "_id");

    setColumnData(newArray);
  }, [board]);

  return (
    <DndContext
      collisionDetection={collisionDropAnimation}
      onDragStart={onHandleDragStart}
      sensors={sensors}
      onDragOver={onHandleDragOver}
      onDragEnd={onHandleDrag}
    >
      <SortableContext
        strategy={horizontalListSortingStrategy}
        items={columnData.map((c) => c._id)}
      >
        <img
          style={{
            objectFit: "cover",
            width: "100%",
            height: "calc(100vh  - 118px)",
            position: "absolute",
            top: "118px",
            zIndex: -1,
          }}
          src={background}
          alt="background"
          loading="lazy"
        />

        <Box
          sx={{
            height: "calc(100vh - 130px)",
            width: "100%",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            cursor: "pointer",

            "&::-webkit-scrollbar-thumb": {
              background: "#313A39",
              borderRadius: "4px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: "100%",
            }}
          >
            {columnData.map((item) => (
              <BoardItem key={item._id} item={item} />
            ))}

            <Box
              sx={{
                padding: "10px",
              }}
            >
              <Button
                startIcon={<AddIcon />}
                sx={{
                  width: "200px",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "black" : "#b9d3d0",
                  height: "44px",
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "white" : "black",
                  justifyContent: "flex-start",
                  padding: 2,
                }}
              >
                Add another list
              </Button>
            </Box>
          </Box>
          <DragOverlay dropAnimation={dropAnimation}>
            {!activeDragItemData.type && null}
            {activeDragItemData.activeId &&
              activeDragItemData.type === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                <BoardItem
                  key={activeDragItemData.activeId}
                  item={activeDragItemData.data as TColumns}
                />
              )}
            {activeDragItemData.activeId &&
              activeDragItemData.type === ACTIVE_DRAG_ITEM_TYPE.CARD && (
                <MediaCard
                  key={activeDragItemData.activeId}
                  data={activeDragItemData.data as TCards}
                />
              )}
          </DragOverlay>
        </Box>
      </SortableContext>
    </DndContext>
  );
};

export default BoardContent;
