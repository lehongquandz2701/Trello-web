import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { useMemo } from "react";
import { MediaCard } from "~/components";
import { mapOrder } from "~/hepler";
import { TCards } from "~/utilities/types";

type TListCardProps = {
  cards: TCards[];
  cardOrderIds: string[];
};

const ListCard = ({ cards, cardOrderIds }: TListCardProps) => {
  const cardArray = useMemo(() => {
    return mapOrder(cards, cardOrderIds, "_id");
  }, [cards, cardOrderIds]);

  return (
    <SortableContext
      items={cardArray.map((c) => c._id)}
      strategy={verticalListSortingStrategy}
    >
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
    </SortableContext>
  );
};

export default ListCard;
