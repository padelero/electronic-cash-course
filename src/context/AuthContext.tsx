
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  walletAddress?: string;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Create context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
});

// Create a hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage (this is temporary for the demo)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data (in a real app this would come from the backend)
    const mockUser = {
      id: '1',
      name: 'Demo User',
      email,
      role: 'student' as const,
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: '1',
      name,
      email,
      role: 'student' as const,
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Update profile function
  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user, 
        login, 
        register, 
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
