import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar/search-bar.component";
import { Donuts } from "../../class/donut/donut";
import { DONUTS } from "../../services/donuts/donuts.service";
import { DonutCardComponent } from "../../components/cards/donut-card/donut-card.component";

@Component({
  selector: "app-page-products",
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    SearchBarComponent,
    DonutCardComponent
  ],
  templateUrl: "./products.component.html"
})
export class ProductsComponent {
  activePage: string = "products";

  key = "";

  donut: Donuts = DONUTS[0];

  processKeyword(keyword: string) {
    if (keyword.length < 2) return;
    this.key = keyword;
  }
}
