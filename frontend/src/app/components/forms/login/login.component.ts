import { Component, OnDestroy, inject } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";

import { ErrorStateMatcher } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { Subscription, catchError, map, of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import {
  AuthService,
  LoginFailure,
  LoginSuccess
} from "../../../services/auth/auth.service";

@Component({
  selector: "app-form-login",
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  template: `
    <form (ngSubmit)="login()" class=" flex flex-col  ">
      <mat-form-field class=" h-20 w-full ">
        <mat-label>Email</mat-label>
        <input
          class=" rounded-lg border border-content"
          type="email"
          matInput
          autocomplete="email"
          [formControl]="emailFormControl"
          [errorStateMatcher]="matcher"
          placeholder="Ex. pat@example.com"
        />
        @if (emailFormControl.hasError("email")) {
          <mat-error>Please enter a valid email address</mat-error>
        }
        @if (emailFormControl.hasError("required")) {
          <mat-error>Email is <strong>required</strong></mat-error>
        }
      </mat-form-field>
      <mat-form-field class=" h-20 w-full ">
        <mat-label>password</mat-label>
        <input
          class=" rounded-lg border border-content"
          type="password"
          autocomplete="current-password"
          matInput
          [formControl]="passwordFormControl"
          [errorStateMatcher]="passwordMatcher"
        />

        @if (passwordFormControl.hasError("required")) {
          <mat-error>Password is <strong>required</strong></mat-error>
        }
      </mat-form-field>
      <button class="h-10 w-full rounded-lg bg-content text-bgc">
        Sign in
      </button>
    </form>
  `
})
export class LoginFormComponent implements OnDestroy {
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  loginStatus$: Observable<LoginSuccess | LoginFailure>;

  passwordFormControl = new FormControl("", [Validators.required]);

  matcher = new MyErrorStateMatcher();
  passwordMatcher = new MyErrorStateMatcher();

  auth = inject(AuthService);

  loginSubscription: Subscription;
  constructor(private router: Router) {}

  login() {
    const email = this.emailFormControl.value as string;
    const password = this.passwordFormControl.value as string;

    this.loginSubscription = this.auth
      .credentialLogin({
        email: email,
        password: password
      })
      .pipe(
        map((res: LoginSuccess) => {
          return {
            token: res.token,
            error: ""
          };
        }),
        catchError((error: { error: LoginFailure }) =>
          of({ error: error.error.responseText, token: "" })
        )
      )

      .subscribe((res) => {
        if (res.error) return;
        this.router.navigate(["products"]).then(() => {
          // window.location.reload();
        });
      });
  }

  ngOnDestroy(): void {
    try {
      if (!this.loginSubscription) return;
      this.loginSubscription.unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
