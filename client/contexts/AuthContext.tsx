import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface User {
  id: string;
  username: string;
  email: string;
  joinDate: string;
  role: "member" | "moderator" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    username: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  memberCount: number;
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
  const [memberCount, setMemberCount] = useState(0);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load member count
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setMemberCount(users.length);
  }, []);

  const signup = async (
    username: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Check if user already exists
      if (
        users.some((u: any) => u.email === email || u.username === username)
      ) {
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        joinDate: new Date().toISOString(),
        role: "member",
      };

      // Save user credentials (in real app, never store plain text passwords)
      const userCredentials = {
        ...newUser,
        password, // In production, this should be hashed
      };

      // Update users array
      users.push(userCredentials);
      localStorage.setItem("users", JSON.stringify(users));

      // Update member count
      setMemberCount(users.length);

      // Auto-login the new user
      setUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u: any) => u.email === email && u.password === password,
      );

      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        setUser(userWithoutPassword);
        localStorage.setItem(
          "currentUser",
          JSON.stringify(userWithoutPassword),
        );
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    memberCount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
