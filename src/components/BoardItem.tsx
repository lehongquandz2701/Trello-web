import { Box } from "@mui/material";
import { TCards, TColumns } from "~/utilities/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ListCard from "~/pages/Boards/BoardContent/ListCard";
import InputCustom from "./InputCustom";
import { useDisclose } from "~/hooks";
import AddItemComponent from "./AddItemComponent";
import { useCallback, useState } from "react";
import { toastError, toastSuccess } from "~/utilities/constant";
import { useCreateCard } from "~/mutations/useCreateCard";

type TBoardItemProps = {
  item: TColumns;
  onUpdateCard: (card: TCards) => void;
};

const BoardItem = ({ item, onUpdateCard }: TBoardItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item._id, data: { ...item } });

  const dndKitColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? 0.5 : undefined,
  };

  const createCardMutation = useCreateCard();
  const addCard = useDisclose();
  const [newCardTitle, setCardTitle] = useState<string>("");

  const addNewColumn = useCallback(() => {
    if (!newCardTitle) return toastError("Please Enter Title");

    createCardMutation.mutate(
      {
        title: newCardTitle.trim(),
        boardId: item.boardId,
        columnId: item._id,
      },
      {
        onSuccess(data) {
          onUpdateCard(data);
          toastSuccess("created column ");
          setCardTitle("");
          addCard.onToggle();
        },
        onError(error: any) {
          toastError(error?.response?.data?.message);
        },
      }
    );
  }, [newCardTitle, setCardTitle, addCard.onToggle, onUpdateCard]);

  return (
    <div {...attributes} style={dndKitColumnStyle} ref={setNodeRef}>
      <Box
        {...listeners}
        sx={{
          padding: "10px",
        }}
      >
        <Box
          sx={{
            width: "272px",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "black" : "#b9d3d0",
            borderRadius: "10px",
            padding: 1,
            height: "fit-content",
          }}
        >
          <InputCustom value={item.title} isShowOption />

          <ListCard cards={item.cards} cardOrderIds={item.cardOrderIds} />

          <AddItemComponent
            placeholder="Enter title or paste a link"
            title="Add a card"
            width="100%"
            isOpen={addCard.isOpen}
            onToggle={addCard.onToggle}
            value={newCardTitle}
            onchange={setCardTitle}
            onClick={addNewColumn}
            titleButton={"Add card"}
          />
        </Box>
      </Box>
    </div>
  );
};

export default BoardItem;
