import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { GeneralS } from "../../shared/reducer";
import { selectPage } from "../../shared/selector";

interface Link {
  name: string;
  navigation: string;
}

@Component({
  selector: "app-navigation",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./navigation.component.html"
})
export class PageNavigationComponent {
  links: Link[] = [
    { name: "home", navigation: "/" },
    { name: "products", navigation: "/products" }
  ];

  private store: Store<{ general: GeneralS }> = inject(Store);
  activePage$ = this.store.select(selectPage);

  constructor(private router: Router) {}

  navigate(name: string) {
    this.router.navigate([name]);
  }
}
