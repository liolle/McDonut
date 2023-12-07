import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthActions } from "../shared/actions";

export const refreshAuth = () => {
  const store: Store = inject(Store);
  store.dispatch(AuthActions.profile());
  return true;
};
