import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Router } from "@angular/router";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { StepsComponent } from "../../components/steps/steps.component";

@Component({
  selector: "app-page-landing",
  standalone: true,
  imports: [CommonModule, NavBarComponent, StepsComponent],
  templateUrl: "./landing.component.html"
})
export class LandingComponent {
  activePage: string = "home";

  constructor(private router: Router) {}

  navigate(name: string) {
    this.router.navigate([name]);
  }
}
