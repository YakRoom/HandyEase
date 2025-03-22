export interface ProviderState {
  profilePic: string;
  payRate: number | null;
  experience: number | null;
  radius: number;
  phone: string;
  allowCalls: boolean;
  resume: string | File;
  about: string;
  skills: string[];
  locationName: string;
  locationId: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export type FieldValue = string | number | boolean | File | string[] | null;

export type ProviderAction =
  | { type: "SET_FIELD"; field: keyof ProviderState; value: FieldValue }
  | { type: "TOGGLE_CALLS" }
  | { type: "ADD_SKILL"; skill: string }
  | { type: "REMOVE_SKILL"; skill: string }
  | { type: "SET_RESUME"; file: File }
  
  | { type: "BULK_UPDATE"; action: any } // eslint-disable-line  @typescript-eslint/no-explicit-any 
  | { type: "SET_LOCATION"; locationId: string; locationName: string };
export const DEFAULT_RADIUS = 5;
export const MIN_RADIUS = 1;
export const MAX_RADIUS = 50;

export const HANDYMEN = [
  { label: "Electrician", key: "ELECTRICIAN" },
  { label: "Plumber", key: "PLUMBER" },
  { label: "Gardener", key: "GARDENER" },
  { label: "Carpenter", key: "CARPENTER" },
  { label: "Painter", key: "PAINTER" },
];
export const CLEANER = [{ label: "Cleaner", key: "CLEANER" }];
export const OTHERS = [{ label: "Baby Sitter", key: "BABY_SITTER" }];

export const AVAILABLE_SKILL = { HANDYMEN, CLEANER, OTHERS };

export const initialState: ProviderState = {
  profilePic: "",
  payRate: null,
  experience: null,
  radius: DEFAULT_RADIUS,
  phone: "",
  allowCalls: false,
  resume: "",
  about: "",
  skills: [],
  locationName: "",
  locationId: "",
};