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

type TMediaCard = {
  urlImage?: string;
  title: string;
};

export default function MediaCard({ title, urlImage }: TMediaCard) {
  const memoImage = useMemo(() => {
    if (!urlImage) {
      return <></>;
    }
    return (
      <CardMedia sx={{ height: 140 }} image={urlImage} title="green iguana" />
    );
  }, []);

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
        <Typography>{title}</Typography>
      </CardContent>
      <CardActions
        sx={{
          padding: "0 4px 8px 4px",
        }}
      >
        <Button startIcon={<GroupIcon />} size="small">
          20
        </Button>
        <Button startIcon={<CommentIcon />} size="small">
          20
        </Button>
        <Button startIcon={<AttachmentIcon />} size="small">
          20
        </Button>
      </CardActions>
    </Card>
  );
}
