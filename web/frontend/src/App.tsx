import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RouteX from "./routes/RouteX";
import { ThemeProvider } from "./utils/ThemeProvider";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./utils/AuthContext";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <RouteX />
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
