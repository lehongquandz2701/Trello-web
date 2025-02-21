import { unstable_createCssVarsProvider as createCssVarsProvider } from "@mui/system";
import myCustomDefaultTheme from "../theme";

const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
  defaultColorScheme: {
    light: "light",
    dark: "dark",
  },
  theme: myCustomDefaultTheme,
});

export { CssVarsProvider, useColorScheme };
