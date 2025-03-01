import { createTheme } from "@mui/material";
import { blue, deepOrange } from "@mui/material/colors";

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
    dark: {
      palette: {
        primary: blue,
        secondary: deepOrange,
      },
    },
    light: {
      palette: {
        primary: blue,
        secondary: deepOrange,
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          wordWrap: "break-word",
          whiteSpace: "normal",
        },
      },
    },
  },
  spacingCustom: {
    header: "58px",
    tabbar: "60px",
  },
});

export default themeMode;
