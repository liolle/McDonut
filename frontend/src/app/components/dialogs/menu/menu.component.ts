import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

interface Link {
  name: string;
  navigation: string;
}

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./menu.component.html",
  styleUrl: "./menu.component.css"
})
export class MenuComponent {
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
