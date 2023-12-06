import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { AuthActions } from "../actions";

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
          catchError((error) => of(AuthActions.loadProfileFailure({ error })))
        );
      })
    )
  );
}
