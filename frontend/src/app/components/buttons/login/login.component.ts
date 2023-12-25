import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, delay, of, switchMap, take } from "rxjs";
import { AuthActions } from "../../../shared/actions";
import { LOG_STATUS, UserS } from "../../../shared/auth/reducer";
import { selectStatus } from "../../../shared/selector";
import { Spinner1Component } from "../../icons/icon.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, Spinner1Component],
  template: `
    <div
      *ngIf="
        (isStateSet$ | async) === undefined ||
          (isStateSet$ | async) === false ||
          (isStateSet$ | async) === null;
        else loginBlock
      "
      class=" h-10 w-20 rounded-lg bg-content text-bgc hover:bg-content/75 "
    >
      <button class="flex h-full w-full items-center justify-center">
        <app-spinner1 />
      </button>
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
export class LoginButtonComponent implements OnInit {
  logS = LOG_STATUS;
  isStateSet$ = of(false);
  isLogged$: Observable<boolean>;

  @Output() clicked = new EventEmitter();

  private readonly store: Store<{ user: UserS }> = inject(Store);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLogged$ = this.store
      .select(selectStatus)
      .pipe(switchMap((value) => of(value === LOG_STATUS.LOGGED)));

    this.isStateSet$ = this.store.select(selectStatus).pipe(
      delay(500),
      take(1),
      switchMap(() => of(true))
    );
  }

  googleLogin() {
    this.router.navigate(["login"]);
    this.clicked.emit();
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
