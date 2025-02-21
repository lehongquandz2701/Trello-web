import { useCallback } from "react";
import {
  Container,
  SelectChangeEvent,
  useColorScheme,
  Box,
} from "@mui/material";
import { SelectAutoWidth } from "./components";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightness from "@mui/icons-material/SettingsBrightness";

function App() {
  const { setMode, mode } = useColorScheme();

  const toggleMode = useCallback(
    (event: SelectChangeEvent) => {
      setMode(event.target.value as any);
    },
    [setMode, mode]
  );

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <Box
          sx={{
            width: "100%",
            height: (theme) => theme.spacingCustom.header,
            display: "flex",
            alignItems: "center",
          }}
        >
          <SelectAutoWidth
            key={mode}
            initValue={mode as string}
            onSelect={toggleMode}
            dataOption={[
              {
                value: "light",
                title: "Light",
                icon: <LightModeIcon fontSize="small" />,
              },
              {
                value: "dark",
                title: "Dark",
                icon: <DarkModeIcon fontSize="small" />,
              },
              {
                value: "system",
                title: "System",
                icon: <SettingsBrightness fontSize="small" />,
              },
            ]}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            height: (theme) => theme.spacingCustom.tabbar,
            display: "flex",
            alignItems: "center",
          }}
        ></Box>
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
        ></Box>
      </Container>
    </>
  );
}

export default App;
