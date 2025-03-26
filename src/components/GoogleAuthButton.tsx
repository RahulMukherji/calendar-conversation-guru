
import React from 'react';
import { Button } from "@/components/ui/button";

type GoogleAuthButtonProps = {
  onLogin: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
  isLoading?: boolean;
  className?: string;
};

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  onLogin,
  onLogout,
  isAuthenticated,
  isLoading = false,
  className = '',
}) => {
  return isAuthenticated ? (
    <Button
      onClick={onLogout}
      variant="outline"
      className={`px-4 py-2 rounded-full flex items-center space-x-2 smooth-transition ${className}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="google-loader mr-2" />
      ) : (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5Z" fill="#34A853" />
          <path d="M12 12H19C19 8.13 15.87 5 12 5V12Z" fill="#EA4335" />
          <path d="M12 12V19C15.87 19 19 15.87 19 12H12Z" fill="#4285F4" />
          <path d="M5 12H12V5C8.13 5 5 8.13 5 12Z" fill="#FBBC05" />
        </svg>
      )}
      <span>{isLoading ? 'Processing...' : 'Sign Out'}</span>
    </Button>
  ) : (
    <Button
      onClick={onLogin}
      className={`px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 shadow rounded-full flex items-center space-x-2 smooth-transition ${className}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="google-loader mr-2" />
      ) : (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
          <path d="M12 23C14.97 23 17.46 22 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.62 12 18.62C9.24 18.62 6.92 16.81 6.09 14.39H2.41V17.24C4.22 20.79 7.83 23 12 23Z" fill="#34A853" />
          <path d="M6.09 14.39C5.88 13.73 5.77 13.02 5.77 12.3C5.77 11.58 5.88 10.87 6.09 10.21V7.36H2.41C1.63 8.81 1.17 10.5 1.17 12.3C1.17 14.1 1.63 15.79 2.41 17.24L6.09 14.39Z" fill="#FBBC05" />
          <path d="M12 5.98C13.46 5.98 14.77 6.47 15.82 7.47L19 4.29C17.46 2.87 14.97 2 12 2C7.83 2 4.22 4.21 2.41 7.76L6.09 10.61C6.92 8.19 9.24 5.98 12 5.98Z" fill="#EA4335" />
        </svg>
      )}
      <span>{isLoading ? 'Processing...' : 'Sign in with Google'}</span>
    </Button>
  );
};

export default GoogleAuthButton;
