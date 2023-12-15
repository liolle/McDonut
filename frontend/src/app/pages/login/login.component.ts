import { Component } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { LoginFormComponent } from "../../components/forms/login/login.component";
import { simpleGoogle } from "@ng-icons/simple-icons";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
@Component({
  selector: "app-login",
  standalone: true,
  imports: [LoginFormComponent, MatDividerModule, NgIconComponent],
  viewProviders: [provideIcons({ simpleGoogle })],
  templateUrl: "./login.component.html"
})
export class LoginComponent {}
