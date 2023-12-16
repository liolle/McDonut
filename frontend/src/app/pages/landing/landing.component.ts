import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Router } from "@angular/router";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { StepsComponent } from "../../components/steps/steps.component";
import { Store } from "@ngrx/store";
import { GeneralActions } from "../../shared/actions";
import { GeneralS } from "../../shared/reducer";

@Component({
  selector: "app-page-landing",
  standalone: true,
  imports: [CommonModule, NavBarComponent, StepsComponent],
  templateUrl: "./landing.component.html"
})
export class LandingComponent {
  private store: Store<{ general: GeneralS }> = inject(Store);

  constructor(private router: Router) {}

  navigate(name: string) {
    this.router.navigate([name]);
  }
}
