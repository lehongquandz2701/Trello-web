import { Box, Button, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useCallback, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import TextareaAutosize from "react-textarea-autosize";
import MediaCard from "./MediaCard";
import { TColumns } from "~/utilities/types";
import { mapOrder } from "~/hepler";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TBoardItemProps = {
  item: TColumns;
};

const BoardItem = ({ item }: TBoardItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item._id, data: { ...item } });

  const dndKitColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    touchAction: "none",
  };

  const [isFocus, setFocus] = useState(false);

  const cardArray = useMemo(() => {
    return mapOrder(item.cards, item.cardOrderIds, "_id");
  }, [item]);

  const styleInput = useMemo(() => {
    return isFocus
      ? { border: "2px solid #00e5ff", borderRadius: 5 }
      : undefined;
  }, [setFocus, isFocus]);

  const onFocusAndBlur = useCallback(() => {
    setFocus((prev) => !prev);
  }, [setFocus]);

  return (
    <Box
      {...listeners}
      {...attributes}
      style={dndKitColumnStyle}
      ref={setNodeRef}
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
        <Box
          sx={{
            p: "0 5px",
            maxHeight: "calc(100vh - 280px)",
            overflowX: "hidden",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            cursor: "pointer",
            // #313A39 #ced0da
            "&::-webkit-scrollbar-thumb": {
              background: "#313A39",
              borderRadius: "4px",
            },
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              flexDirection: "column",
              display: "flex",
              gap: 1,
            }}
          >
            {cardArray.map((data) => (
              <MediaCard key={data._id} data={data} />
            ))}
          </Box>
        </Box>

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
  );
};

export default BoardItem;
