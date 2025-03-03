import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { useMemo } from "react";
import { TCards } from "~/utilities/types";

type TMediaCard = {
  data: TCards;
};

export default function MediaCard({ data }: TMediaCard) {
  const memoImage = useMemo(() => {
    if (!data.cover) {
      return <></>;
    }
    return (
      <CardMedia sx={{ height: 140 }} image={data.cover} title={data.title} />
    );
  }, [data]);

  const memoStateAction = useMemo(() => {
    if (
      !!data.memberIds.length ||
      !!data.comments.length ||
      !!data.attachments.length
    ) {
      return (
        <CardActions
          sx={{
            padding: "0 4px 8px 4px",
          }}
        >
          <Button startIcon={<GroupIcon />} size="small">
            {data.memberIds.length}
          </Button>
          <Button startIcon={<CommentIcon />} size="small">
            {data.comments.length}
          </Button>

          <Button startIcon={<AttachmentIcon />} size="small">
            {data.attachments.length}
          </Button>
        </CardActions>
      );
    }
    return;
  }, [data]);

  return (
    <Card
      sx={{
        maxWidth: 345,
        background: (theme) =>
          theme.palette.mode === "dark" ? "#22272b" : "#b8cad2",
      }}
    >
      {memoImage}
      <CardContent
        sx={{
          ":last-child": {
            paddingBottom: "18px",
          },
        }}
      >
        <Typography>{data.title}</Typography>
      </CardContent>

      {memoStateAction}
    </Card>
  );
}
