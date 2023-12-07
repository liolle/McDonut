import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { of, Observable, switchMap, delay, take } from "rxjs";
import { AuthService } from "../../../services/auth/auth.service";
import { AuthActions } from "../../../shared/actions";
import { LOG_STATUS, UserS } from "../../../shared/auth/reducer";
import { selectStatus } from "../../../shared/selector";
import { Spinner1Component } from "../../icons/icon.component";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, Spinner1Component],
  template: `
    <div
      *ngIf="!(isStateSet$ | async); else loginBlock"
      class=" h-10 w-20 rounded-lg bg-content text-bgc hover:bg-content/75 "
    >
      <button class="h-full w-full"></button>
    </div>

    <ng-template class="" #loginBlock>
      <button
        *ngIf="isLogged$ | async; else login"
        (click)="logout()"
        class=" h-10 w-20 rounded-lg bg-content text-bgc hover:bg-content/75 "
      >
        <span> Logout </span>
      </button>

      <ng-template class="h-full w-full" #login>
        <button
          (click)="googleLogin()"
          class=" h-10 w-20 rounded-lg bg-content text-bgc hover:bg-content/75 "
        >
          <span> Login </span>
        </button>
      </ng-template>
    </ng-template>
  `
})
export class LoginComponent implements OnInit {
  logS = LOG_STATUS;
  isStateSet$ = of(false);
  isLogged$: Observable<boolean>;

  private readonly store: Store<{ user: UserS }> = inject(Store);
  status$: Observable<LOG_STATUS>;
  auth = inject(AuthService);
  constructor() {}

  ngOnInit(): void {
    this.isLogged$ = this.store
      .select(selectStatus)
      .pipe(switchMap((value) => of(value === LOG_STATUS.LOGGED)));

    this.isStateSet$ = this.store.select(selectStatus).pipe(
      delay(500),
      take(1),
      switchMap((value) => of(true))
    );
  }

  googleLogin() {
    this.store.dispatch(AuthActions.login());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
