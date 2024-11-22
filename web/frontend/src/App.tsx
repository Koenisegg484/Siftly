import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RouteX from "./routes/RouteX";
import { ThemeProvider } from "./utils/ThemeProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
    <ThemeProvider>
      <RouteX />
      <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
