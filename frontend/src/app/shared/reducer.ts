import { createReducer, on, createSelector } from "@ngrx/store";
import { GeneralActions } from "./actions";

export interface GeneralS {
  currentPage: string;
}

enum AVAILABLE_PAGE {
  LANDING = "home",
  PRODUCTS = "products"
}

const initialState: GeneralS = {
  currentPage: ""
};

export const generalReducer = createReducer(
  initialState,
  on(GeneralActions.changePage, (state, { page }) => {
    return {
      ...state,
      currentPage: page
    };
  })
);
