import React, { createContext, useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import {
  signIn as amplifySignIn,
  signOut as amplifySignOut,
  fetchUserAttributes,
  fetchAuthSession,
  signUp as amplifySignUp,
} from "aws-amplify/auth";
import { useQueryClient } from "@tanstack/react-query";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID as string,
      userPoolClientId: process.env.REACT_APP_COGNITO_CLIENT_ID as string,
    },
  },
});

export interface CognitoUser {
  id: string;
  email: string;
  accessToken: string;
}

interface AuthContextType {
  user: CognitoUser | null;
  isLoading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshAuthState: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();

  const checkAuthState = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const currentUser = await fetchUserAttributes();
      const session = await fetchAuthSession();

      const { sub, email } = currentUser;
      if (sub && email && session.tokens?.accessToken) {
        setUser({
          id: sub,
          email,
          accessToken: session.tokens.accessToken.toString(),
        });
      }
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["favorites"] });
    queryClient.invalidateQueries({ queryKey: ["searchShows"] });
    queryClient.invalidateQueries({ queryKey: ["trendingShows"] });
  }, [user, queryClient]);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await amplifySignIn({
        username: email,
        password,
      });
    } catch (error) {
      setError(new Error("Error authenticating"));
    }
    setIsLoading(false);
    checkAuthState();
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      await amplifySignUp({
        username: email,
        password,
      });
      await signIn(email, password);
    } catch (error) {
      if ((error as Error).name === "UsernameExistsException") {
        setError(new Error("Email already has an account"));
      } else {
        setError(new Error("Error authenticating"));
      }
    }
    setIsLoading(false);
  };

  const signOut = async () => {
    try {
      await amplifySignOut();
      setUser(null);
    } catch (err) {
      setError(new Error("Error signing out"));
    }
  };

  const refreshAuthState = async () => {
    await checkAuthState();
  };

  const value = {
    user,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    refreshAuthState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
