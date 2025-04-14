
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser, useAuth as useClerkAuth } from "@clerk/clerk-react";

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
  login: () => void;
  register: () => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: () => {},
  register: () => {},
  logout: () => {},
  updateProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const { signOut } = useClerkAuth();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn && clerkUser) {
      setUser({
        id: clerkUser.id,
        name: clerkUser.fullName || clerkUser.firstName || 'Usuario',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        role: 'student' // Ajusta esto según tu lógica de roles
      });
    } else if (isLoaded && !isSignedIn) {
      setUser(null);
    }
  }, [isLoaded, isSignedIn, clerkUser]);

  const login = () => {};  // Clerk maneja el login
  const register = () => {};  // Clerk maneja el registro
  const logout = () => signOut();

  const updateProfile = async () => {
    // Implementar lógica de actualización de perfil con Clerk
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading: !isLoaded, 
        isAuthenticated: !!isSignedIn, 
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

