import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { featherShoppingCart } from "@ng-icons/feather-icons";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/internal/Observable";
import { Donuts } from "../../class/donut/donut";
import { CartComponent } from "../../components/cards/cart/cart.component";
import { DonutCardComponent } from "../../components/cards/donut-card/donut-card.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar/search-bar.component";
import { Cart } from "../../interfaces/cart";
import { DonutsService } from "../../services/donuts/donuts.service";
import { CartDialogComponent } from "../../components/dialogs/cart/cart-dialog.component";
import { selectCart } from "../../shared/cart/cart.reducer";

@Component({
  selector: "app-page-products",
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    SearchBarComponent,
    DonutCardComponent,
    CartComponent,
    NgIconComponent,
    CartDialogComponent
  ],
  templateUrl: "./products.component.html",
  viewProviders: [provideIcons({ featherShoppingCart })]
})
export class ProductsComponent implements OnInit {
  activePage: string = "products";
  donuts$: Observable<Donuts[]>;

  limit = 9;
  page = 0;

  private readonly store: Store<{ cart: Cart }> = inject(Store);
  cart$: Observable<Cart>;

  constructor(private donutService: DonutsService) {}
  ngOnInit(): void {
    this.donuts$ = this.donutService.select({
      limit: this.limit,
      page: this.page,
      keyword: ""
    });
    this.cart$ = this.store.select(selectCart);
  }

  processKeyword(keyword: string) {
    if (keyword.length < 1) {
      this.donuts$ = this.donutService.select({
        limit: this.limit,
        page: this.page,
        keyword: ""
      });
      return;
    }
    this.donuts$ = this.donutService.select({
      limit: this.limit,
      page: this.page,
      keyword: keyword
    });
  }
}
