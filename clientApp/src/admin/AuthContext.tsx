import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthState {
  token: string | null;
  user: { id: number; username: string; name: string } | null;
  isLoggedIn: boolean;
  login: (token: string, user: AuthState["user"]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  token: null,
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<AuthState["user"]>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (t: string, u: AuthState["user"]) => {
    setToken(t);
    setUser(u);
    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
