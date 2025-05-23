import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import { useEffect, useState, type FC } from "react";
import type { UserDto } from "./model/UserDto";
import { ACCESS_TOKEN_NAME } from "./constant/constants";
import { refreshToken } from "./api/service/TokenService";
import { UserService } from "./api/service/UserService";
import { AuthContext } from "./context/AuthContext";
import { AppRoutes } from "./router/AppRoutes";
import { ThemeProvider } from "./components/theme-provider";

export const App: FC = () => {
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    console.log("refresh Token")
    refreshToken().then(async () => {
      if (sessionStorage.getItem(ACCESS_TOKEN_NAME) != null) {
        console.log("get User")
        await UserService.getUser()
          .then((result: any) => { setUser(result) })
          .catch(() => { setUser(null) })
      }
    })
  }, [])

  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ToastContainer theme="dark" style={{ zIndex: 1000 }} />
        <AuthContext.Provider value={{ user, setUser }}>
          <AppRoutes />
        </AuthContext.Provider>
      </ThemeProvider>
    </div>
  )
}