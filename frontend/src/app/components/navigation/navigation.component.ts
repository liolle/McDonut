import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

interface Link {
  name: string;
  navigation: string;
}

@Component({
  selector: "app-navigation",
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
