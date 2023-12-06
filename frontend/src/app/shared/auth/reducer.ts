import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "../actions";
import { UserProfile } from "../../interfaces/api";
import { environment } from "../../../environments/environment";

export enum LOG_STATUS {
  INCOGNITO = "incognito",
  PENDING = "pending",
  LOGGED = "logged"
}
export interface UserS {
  status: LOG_STATUS;
  error?: string;
  user: UserProfile;
}

const initialState: UserS = {
  status: LOG_STATUS.PENDING,
  user: {
    email: "",
    role: "user",
    createdAt: new Date()
  }
};

export const userReducer = createReducer(
  initialState,
  on(AuthActions.loadProfileSuccess, (state, { profile }) => {
    return {
      ...state,
      user: { ...profile },
      status: LOG_STATUS.LOGGED
    };
  }),
  on(AuthActions.loadProfileFailure, (state, { error }) => {
    return {
      ...state,
      error: error.error.errors[0].message,
      status: LOG_STATUS.INCOGNITO
    };
  }),
  on(AuthActions.profile, (state) => {
    return state;
  }),
  on(AuthActions.login, (state) => {
    const apiUrl = environment.apiUrl;
    const win = window.open(`${apiUrl}/oauth/google/redirect`, "_self");
    return state;
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      status: LOG_STATUS.INCOGNITO
    };
  }),
  on(AuthActions.neutral, (state) => {
    return state;
  })
);
