"use client";
import { useAppInit } from "@/hooks/useAppInit";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define types for the state
interface AppState {
  theme: "light" | "dark";
  isAuthenticated: boolean;
  user: {
    id?: string;
    name?: string;
  } | null;
  // Add other state properties here
}

// Define types for actions
type AppAction =
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "SET_AUTH"; payload: boolean }
  | { type: "SET_USER"; payload: AppState["user"] }
  | { type: "LOGOUT" };

// Define the context type
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

// Initial state
const initialState: AppState = {
  theme: "light",
  isAuthenticated: false,
  user: null,
};

// Create the reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    case "SET_AUTH":
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the provider component
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const isInitApisLoading = useAppInit();
  const isLoading = localStorage.getItem("token") ? isInitApisLoading : false;

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {isLoading ? <div>Loading...</div> : children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
