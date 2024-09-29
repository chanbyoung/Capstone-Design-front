import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "../lib/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const response = await axios.post("/api/members/refresh", { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        setIsLoggedIn(true);
        return accessToken;
      } catch (error) {
        if (error.response && error.response.status === 403) {
          logout();
          console.error("Failed to refresh token:", error);
          alert("다시 로그인해 주세요.");
          window.location.href = "/LoginPage";
        }
      }
    } else {
      logout();
      throw new Error("No refresh token available");
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken().catch(console.error);
    }, 15 * 60 * 1000); // Refresh every 15 minutes
    return () => clearInterval(interval);
  }, [refreshToken]);

  const login = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}
