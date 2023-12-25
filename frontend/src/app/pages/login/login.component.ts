import { Component, ViewEncapsulation, inject } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { LoginFormComponent } from "../../components/forms/login/login.component";
import { simpleGoogle } from "@ng-icons/simple-icons";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { AuthService } from "../../services/auth/auth.service";
import { MatTabsModule } from "@angular/material/tabs";
import { SignupComponent } from "../../components/forms/signup/signup.component";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    LoginFormComponent,
    MatDividerModule,
    NgIconComponent,
    MatTabsModule,
    SignupComponent
  ],
  viewProviders: [provideIcons({ simpleGoogle })],
  templateUrl: "./login.component.html",
  styleUrl: "login.component.css",
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  auth = inject(AuthService);

  googleLogin() {
    this.auth.googleLogin();
  }

  index = 0;

  swapTab() {
    this.index = 0;
  }
}
