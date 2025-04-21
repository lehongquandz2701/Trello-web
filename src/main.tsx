import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import themeMode from "./theme.ts";
import QueryClientProvider from "./provider/queryClient.tsx";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
import { BrowserRouter, Routes, Route } from "react-router";
import { LoginScreen, Register } from "./pages/index.ts";
import { AuthProvider } from "~/contexts";
import { PrivateRoute } from "~/routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={themeMode}>
      <QueryClientProvider>
        <AuthProvider>
          <CssBaseline />
          <ConfirmProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<App />} />
                </Route>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </BrowserRouter>
          </ConfirmProvider>
          <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
