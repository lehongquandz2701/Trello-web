import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import themeMode from "./theme.ts";
import QueryClientProvider from "./provider/queryClient.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <QueryClientProvider>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
