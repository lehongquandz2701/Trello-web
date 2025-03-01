import { Container, Divider } from "@mui/material";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent";
import { AppBar } from "~/components";

const Board = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <Divider sx={{ width: "100%" }} />
      <BoardBar />
      <Divider sx={{ width: "100%" }} />
      <BoardContent />
    </Container>
  );
};

export default Board;
