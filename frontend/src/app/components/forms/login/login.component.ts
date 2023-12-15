import { Component } from "@angular/core";
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

@Component({
  selector: "form-login",
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
export class LoginFormComponent {
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).*$/)
  ]);

  matcher = new MyErrorStateMatcher();
  passwordMatcher = new MyErrorStateMatcher();

  login() {
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;

    console.log("Email:", email);
    console.log("Password:", password);
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
