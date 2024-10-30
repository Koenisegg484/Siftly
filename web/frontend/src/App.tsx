import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RouteX from "./routes/RouteX";

function App() {
  return (
    <BrowserRouter>
      <RouteX />
    </BrowserRouter>
  );
}

export default App;
