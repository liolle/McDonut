import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "../actions";
import { UserProfile } from "../../interfaces/api";
import { environment } from "../../../environments/environment";

export enum LOG_STATUS {
  INCOGNITO = "incognito",
  PENDING = "pending",
  LOGGED = "logged"
}

export enum USER_ROLE {
  USER = "user",
  ADMIN = "admin"
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
  on(AuthActions.loadProfileSuccess, (state, { profile }): UserS => {
    return {
      ...state,
      user: { ...profile },
      status: LOG_STATUS.LOGGED
    };
  }),
  on(AuthActions.loadProfileFailure, (state): UserS => {
    return {
      ...state,
      error: "Load profile failure",
      status: LOG_STATUS.INCOGNITO
    };
  }),
  on(AuthActions.profile, (state): UserS => {
    return state;
  }),
  on(AuthActions.login, (state): UserS => {
    const apiUrl = environment.apiUrl;
    window.open(`${apiUrl}/oauth/google/redirect`, "_self");
    return state;
  }),
  on(AuthActions.logout, (state): UserS => {
    return state;
  }),
  on(AuthActions.neutral, (state): UserS => {
    return state;
  }),
  on(AuthActions.logoutSuccess, (state): UserS => {
    // window.location.reload();
    return {
      ...state,
      user: {
        email: "",
        role: USER_ROLE.USER,
        createdAt: new Date()
      }
    };
  })
);
