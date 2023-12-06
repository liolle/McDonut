import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "../actions";
import { UserProfile } from "../../interfaces/api";
import { environment } from "../../../environments/environment";

export enum LOG_STATUS {
  PENDING = "pending",
  LOGGED = "logged",
  INCOGNITO = "incognito"
}
export interface UserS {
  status: LOG_STATUS;
  error?: string;
  user: UserProfile;
}

const initialState: UserS = {
  status: LOG_STATUS.INCOGNITO,
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
      status: LOG_STATUS.LOGGED,
      user: { ...profile }
    };
  }),
  on(AuthActions.loadProfileFailure, (state, { error }) => {
    console.log(error.error.errors[0].message);

    return {
      ...state,
      error: error.error.errors[0].message
    };
  }),
  on(AuthActions.profile, (state) => {
    return {
      ...state
    };
  }),
  on(AuthActions.login, (state) => {
    const apiUrl = environment.apiUrl;
    const win = window.open(`${apiUrl}/oauth/google/redirect`, "_self");
    return state;
  })
);
