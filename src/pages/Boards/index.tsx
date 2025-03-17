import { Container, Divider } from "@mui/material";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent";
import { AppBar, Loading } from "~/components";
import { useGetBoardDetail } from "~/query/useGetBoardDetail";

const Board = () => {
  const { data: board, isLoading } = useGetBoardDetail();

  if (isLoading) {
    return <Loading />;
  }

  if (!board) return <p>board nothing </p>;

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <Divider sx={{ width: "100%" }} />
      <BoardBar board={board} />
      <Divider sx={{ width: "100%" }} />
      <BoardContent board={board} />
    </Container>
  );
};

export default Board;
