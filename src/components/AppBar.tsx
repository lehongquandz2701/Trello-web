import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightness from "@mui/icons-material/SettingsBrightness";
import { Box, SelectChangeEvent, useColorScheme } from "@mui/material";
import SelectAutoWidth from "./SelectAutoWidth";
import { useCallback } from "react";

const dataOption = [
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
];

const AppBar = () => {
  const { setMode, mode } = useColorScheme();

  const toggleMode = useCallback(
    (event: SelectChangeEvent) => {
      setMode(event.target.value as any);
    },
    [setMode, mode]
  );

  return (
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
        dataOption={dataOption}
      />
    </Box>
  );
};

export default AppBar;
