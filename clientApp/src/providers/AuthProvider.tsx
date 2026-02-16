import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextValue = {
  authed: boolean;
  loading: boolean;
  error: string;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

function normalizeBaseUrl(v?: string) {
  return (v || "").trim().replace(/\/+$/, "");
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const API_BASE = useMemo(() => normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL), []);

  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = async () => {
    if (!API_BASE) {
      setAuthed(false);
      setLoading(false);
      setError("Ingen API-konfiguration hittades (VITE_API_BASE_URL saknas).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        setAuthed(false);
        setLoading(false);
        return;
      }

      const json = (await res.json()) as { authed?: boolean };
      setAuthed(Boolean(json?.authed));
    } catch (e: any) {
      setAuthed(false);
      setError(e?.message || "Kunde inte kontakta backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (password: string) => {
    if (!API_BASE) {
      setError("Ingen API-konfiguration hittades (VITE_API_BASE_URL saknas).");
      return false;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setAuthed(false);
        setError(res.status === 401 ? "Fel lösenord." : `Inloggning misslyckades (HTTP ${res.status}).`);
        return false;
      }

      await refresh();
      return true;
    } catch (e: any) {
      setAuthed(false);
      setError(e?.message || "Inloggning misslyckades.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (!API_BASE) {
      setAuthed(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // ignore
    } finally {
      setAuthed(false);
      setLoading(false);
    }
  };

  const value: AuthContextValue = {
    authed,
    loading,
    error,
    login,
    logout,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
