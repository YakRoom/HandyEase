"use client";
import { useAppInit } from "@/hooks/useAppInit";
import { useErrorObserver } from "@/hooks/useErrorObserver";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

// Define types for the state
interface AppState {
  user: {
    id?: string;
    name?: string;
  } | null;
  // Add other state properties here
  searchedLocation?: string;
}

// Define types for actions
  type AppAction =
  | { type: "SET_USER"; payload: AppState["user"] }
  | { type: "SET_SEARCHED_LOCATION"; payload: string };

// Define the context type
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

// Initial state
const initialState: AppState = {
  user: null,
  searchedLocation: "",
};

// Create the reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_SEARCHED_LOCATION":
      return {
        ...state,
        searchedLocation: action.payload,
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
  const isInitApisLoading = useAppInit(state, dispatch);
  useErrorObserver();

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {isInitApisLoading ? <div>Loading...</div> : children}
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
