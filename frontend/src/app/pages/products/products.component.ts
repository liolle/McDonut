import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";

@Component({
  selector: "app-page-products",
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.css"
})
export class ProductsComponent {
  activePage: string = "products";
}
