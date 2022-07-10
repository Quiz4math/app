import React, { useCallback, ReactNode } from 'react';
import { createContext, useState, useContext, useEffect } from 'react';
import { AuthStore } from '../../stores/AuthStore';

const authStore = AuthStore.shared();

export interface AuthState {
  loggedIn(): void;
  loggedOut(): void;
  readonly isLoggedIn?: boolean;
}

const authActions = {
  loggedIn: () => {
    console.log('fake called');
  },
  loggedOut: () => {
    console.log('fake called');
  },
  isLoggedIn: false,
};

export const StaticAuth = {
  logout: () => {},
  isLoggedIn: false,
};

export const AuthContext = createContext<AuthState>(authActions);

export function useAuthState() {
  return useContext(AuthContext);
}

interface Props {
  children?: ReactNode;
}

const authProvider: React.FunctionComponent<Props> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  const loggedIn = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const loggedOut = useCallback(() => {
    setIsLoggedIn(false);
    authStore.clear();
  }, []);

  useEffect(() => {
    StaticAuth.logout = loggedOut;
    StaticAuth.isLoggedIn = isLoggedIn === true;
  }, [loggedOut, isLoggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, loggedOut, isLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthProvider = React.memo(authProvider);
