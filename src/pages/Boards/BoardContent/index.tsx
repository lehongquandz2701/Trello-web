import { BoardItem, List } from "~/components";
import background from "~/assets/image/bg.png";
const BoardContent = () => {
  return (
    <>
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
      <List content={<BoardItem />} />
    </>
  );
};

export default BoardContent;
