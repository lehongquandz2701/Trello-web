import { Box, Button, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useCallback, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import TextareaAutosize from "react-textarea-autosize";
import { TColumns } from "~/utilities/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ListCard from "~/pages/Boards/BoardContent/ListCard";

type TBoardItemProps = {
  item: TColumns;
};

const BoardItem = ({ item }: TBoardItemProps) => {
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

  const [isFocus, setFocus] = useState(false);

  const styleInput = useMemo(() => {
    return isFocus
      ? { border: "2px solid #00e5ff", borderRadius: 5 }
      : undefined;
  }, [setFocus, isFocus]);

  const onFocusAndBlur = useCallback(() => {
    setFocus((prev) => !prev);
  }, [setFocus]);

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
          <Box
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              position: "relative",
              marginBottom: "10px",
              height: 40,
            }}
          >
            <TextareaAutosize
              value={item.title}
              maxRows={15}
              onFocus={onFocusAndBlur}
              onBlur={onFocusAndBlur}
              style={{
                marginRight: "50px",
                height: 34,
                width: "100%",
                overflow: "hidden",
                outline: "none",
                padding: "5px 10px",
                fontSize: "16px",
                fontWeight: "500",
                borderRadius: 5,
                resize: "none",
                ...styleInput,
              }}
            />

            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 5,
                ":hover": {
                  bgcolor: "#393b3d",
                  borderRadius: 2,
                },
              }}
              aria-label="add an alarm"
            >
              <MoreHorizIcon />
            </IconButton>
          </Box>

          <ListCard cards={item.cards} cardOrderIds={item.cardOrderIds} />

          <Box
            sx={{
              width: "100%",
              height: 40,
            }}
          >
            <Button
              startIcon={
                <AddIcon
                  sx={{
                    height: "20px",
                    width: "20px",
                  }}
                />
              }
              sx={{
                width: "85%",
                justifyContent: "flex-start",
                ":hover": {
                  bgcolor: "#393b3d",
                  borderRadius: 2,
                },
                color: (theme) =>
                  theme.palette.mode === "dark" ? "white" : "black",
                fontSize: "16px",
              }}
            >
              Add a card
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default BoardItem;
