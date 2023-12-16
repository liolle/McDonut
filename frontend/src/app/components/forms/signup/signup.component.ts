import {
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  inject
} from "@angular/core";
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
import { Observable, Subscription, catchError, map, of } from "rxjs";
import {
  AuthService,
  LoginFailure,
  LoginSuccess,
  SignUpSuccess
} from "../../../services/auth/auth.service";

@Component({
  selector: "app-form-signup",
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  template: `
    <form (ngSubmit)="signup()" class=" flex flex-col  ">
      <mat-form-field class=" h-20 w-full ">
        <mat-label>Email</mat-label>
        <input
          class=" rounded-lg border border-content"
          type="email"
          matInput
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
          matInput
          [formControl]="passwordFormControl"
          [errorStateMatcher]="passwordMatcher"
        />

        @if (
          passwordFormControl.hasError("minlength") &&
          !passwordFormControl.hasError("pattern")
        ) {
          <mat-error>Needs 5 characters </mat-error>
        }
        @if (passwordFormControl.hasError("pattern")) {
          <mat-error>Needs 1 capital letter & 1 number </mat-error>
        }
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
export class SignupComponent implements OnDestroy {
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  loginStatus$: Observable<LoginSuccess | LoginFailure>;

  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).*$/)
  ]);

  matcher = new MyErrorStateMatcher();
  passwordMatcher = new MyErrorStateMatcher();

  auth = inject(AuthService);

  loginSubscription: Subscription;

  @Output()
  done = new EventEmitter<string>();

  signup() {
    const email = this.emailFormControl.value as string;
    const password = this.passwordFormControl.value as string;

    this.loginSubscription = this.auth
      .signup({
        email: email,
        password: password
      })
      .pipe(
        map((res: SignUpSuccess) => {
          return {
            email: res.email,
            id: res.id,
            error: ""
          };
        }),
        catchError(() => {
          return of({ error: "signup failed" });
        })
      )

      .subscribe((res) => {
        if (res.error) return;
        this.done.emit("done");
      });
  }

  ngOnDestroy(): void {
    try {
      this.loginSubscription.unsubscribe();
      if (!this.loginSubscription) return;
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
