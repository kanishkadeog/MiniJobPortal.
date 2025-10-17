import React, { createContext, useContext, useState, useEffect } from "react";
import * as api from "./api";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(api.getCurrentUser());

  useEffect(() => {
    setUser(api.getCurrentUser());
  }, []);

  const login = (email, password) => {
    const res = api.login(email, password);
    if (res) {
      setUser(res);
      return { ok: true };
    }
    return { ok: false, message: "Invalid credentials" };
  };

  const register = (payload) => {
    const res = api.register(payload);
    if (res) {
      setUser(res);
      return { ok: true };
    }
    return { ok: false, message: "User already exists" };
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  const value = { user, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
