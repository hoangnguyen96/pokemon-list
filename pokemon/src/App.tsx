import { ThemeProvider } from "@mui/material";
import "./styles/main.css";
import { ProductPage } from "./pages";
import { theme } from "./themes";
import { useState } from "react";

function App() {
  const [state, setState] = useState("");

  return (
    <main className="container">
      <ThemeProvider theme={theme}>
        <ProductPage />
        <p>{state}</p>
        <input type="text" onChange={(e) => setState(e.target.value)} />
      </ThemeProvider>
    </main>
  );
}

export default App;
