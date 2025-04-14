
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser, useAuth as useClerkAuth } from "@clerk/clerk-react";

// Verificar si Clerk está disponible basado en la variable de entorno
const isClerkAvailable = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

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
  isClerkAvailable: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: () => {},
  register: () => {},
  logout: () => {},
  updateProfile: async () => {},
  isClerkAvailable: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Solo usar hooks de Clerk si está disponible
  const clerkAuth = isClerkAvailable ? useClerkAuth() : null;
  const userInfo = isClerkAvailable ? useUser() : null;
  
  // Extraer valores de los hooks de Clerk o usar valores por defecto
  const isLoaded = userInfo?.isLoaded ?? true;
  const isSignedIn = userInfo?.isSignedIn ?? false;
  const clerkUser = userInfo?.user ?? null;
  const signOut = clerkAuth?.signOut ?? (() => {});

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isClerkAvailable && isLoaded && isSignedIn && clerkUser) {
      setUser({
        id: clerkUser.id,
        name: clerkUser.fullName || clerkUser.firstName || 'Usuario',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        role: 'student' // Ajusta esto según tu lógica de roles
      });
    } else if ((isClerkAvailable && isLoaded && !isSignedIn) || !isClerkAvailable) {
      setUser(null);
    }
  }, [isLoaded, isSignedIn, clerkUser, isClerkAvailable]);

  // Si Clerk no está disponible, mostrar alerta en consola cuando se intente usar funcionalidad de auth
  const handleAuthAction = () => {
    if (!isClerkAvailable) {
      console.warn('⚠️ Autenticación no disponible. Configura VITE_CLERK_PUBLISHABLE_KEY');
    }
  };

  const login = () => handleAuthAction();
  const register = () => handleAuthAction();
  const logout = () => {
    if (isClerkAvailable) {
      signOut();
    } else {
      handleAuthAction();
    }
  };

  const updateProfile = async () => {
    handleAuthAction();
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading: isClerkAvailable ? !isLoaded : false, 
        isAuthenticated: isClerkAvailable ? !!isSignedIn : false, 
        login, 
        register, 
        logout,
        updateProfile,
        isClerkAvailable
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
