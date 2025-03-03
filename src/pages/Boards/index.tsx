import { Container, Divider } from "@mui/material";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent";
import { AppBar } from "~/components";
import { mockData } from "~/apis/mock-data";

const Board = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <Divider sx={{ width: "100%" }} />
      <BoardBar board={mockData.board} />
      <Divider sx={{ width: "100%" }} />

      <BoardContent board={mockData.board} />
    </Container>
  );
};

export default Board;
