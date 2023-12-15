import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, map, of, switchMap } from "rxjs";
import { ApiError } from "../../interfaces/api";
import { AuthService } from "../../services/auth/auth.service";
import { AuthActions } from "../actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  loadProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.profile),
      switchMap(() => {
        return this.authService.me().pipe(
          map((profile) => AuthActions.loadProfileSuccess({ profile })),
          catchError((error: { error: { errors: ApiError[] } }) =>
            of(AuthActions.loadProfileFailure({ error }))
          )
        );
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),

      switchMap(() => {
        return this.authService.login().pipe(map(() => AuthActions.neutral()));
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),

      switchMap(() => {
        return this.authService.logout().pipe(
          map(() => {
            return AuthActions.logoutSuccess();
          })
        );
      })
    );
  });
}
