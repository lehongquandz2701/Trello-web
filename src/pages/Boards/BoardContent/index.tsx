import { BoardItem } from "~/components";
import background from "~/assets/image/bg.png";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TBoard, TColumns } from "~/utilities/types";
import { useCallback, useEffect, useMemo, useState } from "react";
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
} from "@dnd-kit/core";

type TBoardContentProps = {
  board: TBoard;
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

  const [columnData, setColumnData] = useState<TColumns[]>([]);

  const onHandleDrag = useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e;

      if (!over) return;

      if (active.id !== over?.id) {
        const oldIndex = columnData.findIndex((c) => c._id === active.id);

        const newIndex = columnData.findIndex((c) => c._id === over?.id);

        const newColumnData = arrayMove(columnData, oldIndex, newIndex);

        setColumnData(newColumnData);
      }
    },
    [columnData, setColumnData]
  );

  useEffect(() => {
    const newArray = mapOrder(board.columns, board.columnOrderIds, "_id");

    setColumnData(newArray);
  }, [board]);

  return (
    <DndContext sensors={sensors} onDragEnd={onHandleDrag}>
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
              justifyContent: "flex-start",
              alignItems: "flex-start",
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
        </Box>
      </SortableContext>
    </DndContext>
  );
};

export default BoardContent;
