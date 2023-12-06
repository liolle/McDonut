import { createReducer, createSelector } from "@ngrx/store";

export interface User {
  email: string;
  role: "user" | "admin";
  createdAt: Date;
}

const initialState: User = {
  email: "",
  role: "user",
  createdAt: new Date()
};

export const userReducer = createReducer(initialState);

export interface UserState {
  user: User;
}
