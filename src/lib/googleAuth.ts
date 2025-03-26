
// Mock Google OAuth functionality - would be replaced with actual Google OAuth implementation
const STORAGE_KEY = 'calendar_assistant_auth';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    picture: string;
  } | null;
  token: string | null;
}

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Load auth state from local storage
export const loadAuthState = (): AuthState => {
  try {
    const storedState = localStorage.getItem(STORAGE_KEY);
    if (storedState) {
      return JSON.parse(storedState);
    }
  } catch (error) {
    console.error('Error loading auth state from storage', error);
  }
  return defaultAuthState;
};

// Save auth state to local storage
export const saveAuthState = (state: AuthState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving auth state to storage', error);
  }
};

// Clear auth state from local storage
export const clearAuthState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing auth state from storage', error);
  }
};

// Mock login function - would be replaced with actual Google OAuth
export const loginWithGoogle = async (): Promise<AuthState> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful authentication
  const newAuthState: AuthState = {
    isAuthenticated: true,
    user: {
      name: 'Test User',
      email: 'test@example.com',
      picture: '',
    },
    token: 'mock-auth-token',
  };
  
  saveAuthState(newAuthState);
  return newAuthState;
};

// Mock logout function
export const logoutFromGoogle = async (): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  clearAuthState();
};

// Check if token is valid (mock implementation)
export const isTokenValid = (): boolean => {
  const authState = loadAuthState();
  return !!authState.token;
};
