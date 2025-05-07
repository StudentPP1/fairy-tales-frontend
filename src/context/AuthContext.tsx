import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshTokenState, setRefreshTokenState] = useState<string | null>(null);

  // Метод для логіну
  const login = (newAccessToken: string, newRefreshToken: string) => {
    setAccessToken(newAccessToken);
    setRefreshTokenState(newRefreshToken);
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  };

  // Метод для виходу (logout)
  const logout = () => {
    setAccessToken(null);
    setRefreshTokenState(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // Логіка оновлення accessToken за допомогою refreshToken
  const refreshAccessToken = async () => {
    if (!refreshTokenState) return;
    try {
      // Симуляція запиту для оновлення токена
      const response = await fetch("/api/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: refreshTokenState }),
      });

      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.accessToken;
        setAccessToken(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error refreshing token", error);
      logout();
    }
  };

  // Завантаження токенів з локального сховища при старті додатку
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshTokenState(storedRefreshToken);
    }
  }, []);

  // Автоматичне оновлення токена кожні 15 хвилин
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 15 * 60 * 1000); // кожні 15 хв
    return () => clearInterval(interval);
  }, [refreshTokenState]);

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken: refreshTokenState, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};