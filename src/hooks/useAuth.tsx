
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { 
  loadAuthState, 
  loginWithGoogle, 
  logoutFromGoogle,
  isTokenValid
} from '@/lib/googleAuth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    picture: string;
  } | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState(() => loadAuthState());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token is valid on initial load
    const valid = isTokenValid();
    if (!valid && authState.isAuthenticated) {
      setAuthState({ isAuthenticated: false, user: null, token: null });
    }
    setLoading(false);
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      const newAuthState = await loginWithGoogle();
      setAuthState(newAuthState);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutFromGoogle();
      setAuthState({ isAuthenticated: false, user: null, token: null });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
