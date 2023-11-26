import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar/search-bar.component";
import { Donuts } from "../../class/donut/donut";
import { DonutCardComponent } from "../../components/cards/donut-card/donut-card.component";
import { DonutsService } from "../../services/donuts/donuts.service";
import { Observable } from "rxjs/internal/Observable";

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
export class ProductsComponent implements OnInit {
  activePage: string = "products";
  donuts$: Observable<Donuts[]>;

  constructor(private donutService: DonutsService) {}
  ngOnInit(): void {
    this.donuts$ = this.donutService.get(9);
  }

  processKeyword(keyword: string) {
    if (keyword.length < 1) {
      this.donuts$ = this.donutService.get(9);
      return;
    }
    this.donuts$ = this.donutService.getByTerm(keyword);
  }
}
