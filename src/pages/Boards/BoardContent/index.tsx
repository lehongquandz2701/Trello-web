import { Box } from "@mui/material";

const BoardContent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        background: "yellow",
        display: "flex",
        alignItems: "center",
        height: (theme) =>
          `calc(100vh - ${
            theme.spacingCustom.tabbar + theme.spacingCustom.header
          })`,
      }}
    >
      BoardContent
    </Box>
  );
};

export default BoardContent;
