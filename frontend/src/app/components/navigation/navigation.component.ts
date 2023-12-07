import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
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
export class PageNavigationComponent implements OnInit {
  links: Link[] = [
    { name: "home", navigation: "/" },
    { name: "products", navigation: "/products" }
  ];

  activePage!: string;

  private store: Store<{ general: GeneralS }> = inject(Store);

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.store.select(selectPage).subscribe((val) => {
      this.activePage = val;
    });
  }

  navigate(name: string) {
    this.router.navigate([name]);
  }
}
