import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Weather from "./pages/Weather/Weather";
import ThemeProvider from "./theme";

const router = createBrowserRouter([
  {
    path: "/weather",
    element: <Weather />,
  },
]);

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
