import { Component, Inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

interface Link {
  name: string;
  navigation: string;
}

@Component({
  selector: "page-navigation",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./navigation.component.html",
  styleUrl: "./navigation.component.css"
})
export class PageNavigationComponent {
  links: Link[] = [
    { name: "home", navigation: "/" },
    { name: "products", navigation: "/products" }
  ];

  @Input()
  activePage!: string;

  constructor(private router: Router) {}

  navigate(name: string) {
    this.router.navigate([name]);
  }
}
