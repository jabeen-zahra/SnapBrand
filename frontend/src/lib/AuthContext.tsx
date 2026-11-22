import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  email: string;
  fullName: string;
  plan: "Starter" | "Pro Creator" | "Team Studio";
  themePreference: "dark" | "light";
  avatar: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signup: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signin: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("snapbrand_jwt"),
  );
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate user profile if token is in localStorage
  useEffect(() => {
    const hydrateSession = async () => {
      const savedToken = localStorage.getItem("snapbrand_jwt");
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/v1/auth/me", {
          headers: { Authorization: `Bearer ${savedToken}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setToken(savedToken);
        } else {
          localStorage.removeItem("snapbrand_jwt");
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to restore session:", err);
      } finally {
        setIsLoading(false);
      }
    };

    hydrateSession();
  }, []);

  const signup = async (fullName: string, email: string, password: string) => {
    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          error: data.error || "Failed to create account.",
        };
      }

      localStorage.setItem("snapbrand_jwt", data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: "Network error connecting to API." };
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Invalid credentials." };
      }

      localStorage.setItem("snapbrand_jwt", data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: "Network error connecting to API." };
    }
  };

  const signout = () => {
    localStorage.removeItem("snapbrand_jwt");
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!token) return false;
    try {
      const res = await fetch("/api/v1/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, signup, signin, signout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
