"use client";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
import Loader from "@/components/AppLoader/onAppload";
import { useAppInit } from "@/hooks/useAppInit";
import { useErrorObserver } from "@/hooks/useErrorObserver";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define types for the state
export interface AppState {
  user: {
    id?: string;
    name?: string;
    firstName?: string;
    policyAccepted?: boolean;
    role?: CreateUserDtoRole;
  } | null;
  // Add other state properties here
  searchedLocation: {
    description: string;
    placeId: string;
  } | null;
  isOnboarded: boolean;
}

// Define types for actions
type AppAction =
  | { type: "SET_USER"; payload: AppState["user"] }
  | { type: "LOGOUT" }
  | { type: "SET_SEARCHED_LOCATION"; payload: AppState["searchedLocation"] }
  | { type: "SET_ONBOARDED"; payload: AppState["isOnboarded"] };

// Define the context type
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

// Initial state
const initialState: AppState = {
  user: null,
  searchedLocation: null,
  isOnboarded: false,
};

// Create the reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isOnboarded: false,
        searchedLocation: null,
      };

    case "SET_SEARCHED_LOCATION":
      return {
        ...state,
        searchedLocation: action.payload,
      };
    case "SET_ONBOARDED":
      return {
        ...state,
        isOnboarded: action.payload,
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
      {isInitApisLoading ? (
     <Loader></Loader>
      ) : (
        children
      )}
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
