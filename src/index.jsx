import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "animate.css";
import { AuthContextProvider } from "./context/authContext";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <App />
    <Toaster />
  </AuthContextProvider>
);
