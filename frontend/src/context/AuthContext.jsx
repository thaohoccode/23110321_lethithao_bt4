import { createContext, useEffect, useMemo, useState } from "react";
import api from "../api/client";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => JSON.parse(localStorage.getItem("auth") || "null"));

  useEffect(() => {
    if (auth) localStorage.setItem("auth", JSON.stringify(auth));
    else localStorage.removeItem("auth");
  }, [auth]);

  const login = async (email) => {
    const { data } = await api.post("/auth/login", { email });
    setAuth(data);
  };

  const logout = () => setAuth(null);

  const value = useMemo(() => ({ auth, login, logout }), [auth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
