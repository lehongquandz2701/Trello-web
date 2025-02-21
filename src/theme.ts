import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    spacingCustom: {
      header: string;
      tabbar: string;
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    spacingCustom?: {
      header?: string;
      tabbar: string;
    };
  }
}

const themeMode = createTheme({
  colorSchemes: {
    dark: true,
  },
  spacingCustom: {
    header: "48px",
    tabbar: "58px",
  },
});

export default themeMode;
