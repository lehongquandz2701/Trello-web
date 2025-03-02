import { BoardItem } from "~/components";
import background from "~/assets/image/bg.png";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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

      <Box
        sx={{
          height: "calc(100vh - 130px)",
          width: "100%",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          cursor: "pointer",

          "&::-webkit-scrollbar-thumb": {
            background: "#313A39",
            borderRadius: "4px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {[1, 2, 3, 4, 45, , 6, 7, 8, 0, 9, 1212, 31].map((item, index) => (
            <Box
              key={index}
              sx={{
                padding: "10px",
              }}
            >
              <BoardItem />
            </Box>
          ))}

          <Box
            sx={{
              padding: "10px",
            }}
          >
            <Button
              startIcon={<AddIcon />}
              sx={{
                width: "200px",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "black" : "#b9d3d0",
                height: "44px",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "white" : "black",
                justifyContent: "flex-start",
                padding: 2,
              }}
            >
              Add another list
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BoardContent;
