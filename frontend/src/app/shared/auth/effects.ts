import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { AuthActions } from "../actions";
import { ApiError } from "../../interfaces/api";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.profile),
      switchMap(() => {
        return this.authService.me().pipe(
          map((profile) => AuthActions.loadProfileSuccess({ profile })),
          catchError((error: { error: { errors: ApiError[] } }) =>
            of(AuthActions.loadProfileFailure({ error }))
          )
        );
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),

      switchMap(() => {
        return this.authService.login().pipe(map(() => AuthActions.neutral()));
      })
    )
  );
}
