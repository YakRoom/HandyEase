"use client";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
import Loader from "@/components/ui/onAppload";
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
        // <div className="fixed inset-0 flex items-center justify-center bg-white my-12">
        //   <div className="space-y-8 text-center">
        //     <div className="relative">
        //       {/* Outer glow */}
        //       <div className="absolute -inset-2 bg-gradient-to-r from-primary via-primary/60 to-primary rounded-full blur-md animate-[spin_4s_linear_infinite]" />

        //       {/* Main container */}
        //       <div className="relative w-28 h-28 rounded-full bg-white flex items-center justify-center">
        //         {/* Background circles */}
        //         <div className="absolute inset-0 flex items-center justify-center">
        //           <div className="w-24 h-24 border-8 border-primary/10 rounded-full" />
        //         </div>

        //         {/* Spinning borders */}
        //         <div className="absolute inset-0 border-t-8 border-r-8 border-primary rounded-full animate-[spin_0.8s_linear_infinite]" />
        //         <div className="absolute inset-0 border-b-8 border-l-8 border-primary/30 rounded-full animate-[spin_1.2s_linear_infinite_reverse]" />

        //         {/* Center dot with trail */}
        //         <div className="relative">
        //           <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm animate-pulse" />
        //           <div className="w-4 h-4 bg-primary rounded-full animate-[bounce_1s_ease-in-out_infinite]" />
        //         </div>
        //       </div>
        //     </div>

        //     <div>
        //       <h2 className="text-xl font-semibold text-primary animate-[pulse_2s_ease-in-out_infinite]">
        //         Loading Handyman
        //       </h2>
        //       <p className="text-sm text-neutral-500 mt-2 animate-[pulse_2s_ease-in-out_infinite_0.5s]">
        //         Please wait while we set things up
        //       </p>
        //     </div>
        //   </div>
        // </div>
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
