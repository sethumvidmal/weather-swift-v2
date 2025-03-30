import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider } from "./context/ThemeContext";
import { useTheme } from "./hooks/useTheme";
import Weather from "./pages/Weather/Weather";

const router = createBrowserRouter([
  {
    path: "/weather",
    element: <Weather />,
  },
]);

const ThemedApp = () => {
  const { darkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#1a1a2e" : "#f0f2f5",
        paper: darkMode
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(255, 255, 255, 0.8)",
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </MuiThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
};

export default App;
