import { ThemeProvider } from "@mui/material";
import "./styles/main.css";
import { ProductPage } from "./pages";
import { theme } from "./themes";

const App = () => {
  return (
    <main className="container">
      <ThemeProvider theme={theme}>
        <ProductPage />
      </ThemeProvider>
    </main>
  );
};

export default App;
