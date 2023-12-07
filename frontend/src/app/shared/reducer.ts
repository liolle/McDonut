import { createReducer, on } from "@ngrx/store";
import { GeneralActions } from "./actions";

export interface GeneralS {
  currentPage: string;
}

const initialState: GeneralS = {
  currentPage: ""
};

export const generalReducer = createReducer(
  initialState,
  on(GeneralActions.changePage, (state, { page }): GeneralS => {
    return {
      ...state,
      currentPage: page
    };
  })
);
