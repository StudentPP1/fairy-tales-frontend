import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./router/AppRoutes";
import NavBar from "./components/NavBar";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar/>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}