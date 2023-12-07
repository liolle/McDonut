import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthActions } from "../shared/actions";
import { UserS } from "../shared/auth/reducer";

export const refreshAuth = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store: Store<{ user: UserS }> = inject(Store);
  store.dispatch(AuthActions.profile());
  return true;
};
