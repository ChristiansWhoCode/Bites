import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing token on app load
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      try {
        // Decode JWT to get user info
        const payload = JSON.parse(atob(savedToken.split(".")[1]));
        setUser({ email: payload.email, name: payload.name });
        setToken(savedToken);
      } catch (error) {
        // Invalid token, remove it
        console.error("Invalid token format", error);
        localStorage.removeItem("access_token");
      }
    }
  }, []);

  const login = (userData: User, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("access_token", userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("access_token");
  };

  const isLoggedIn = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
