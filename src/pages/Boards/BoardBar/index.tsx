import { Box } from "@mui/material";

const BoardBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.spacingCustom.tabbar,
        display: "flex",
        alignItems: "center",
      }}
    >
      Board Bar
    </Box>
  );
};

export default BoardBar;
