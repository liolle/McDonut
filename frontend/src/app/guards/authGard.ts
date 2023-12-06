import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, take } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
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

export const isLogged = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth: AuthService = inject(AuthService);
  return auth.me().pipe(
    take(1),
    map((value) => !!value.email)
  );
};
