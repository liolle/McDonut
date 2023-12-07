import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/internal/Observable";
import { Cart } from "../../../interfaces/cart";
import { Donuts } from "../../../class/donut/donut";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { radixMinus, radixPlus } from "@ng-icons/radix-icons";
import { CartActions } from "../../../shared/actions";
import { selectCart } from "../../../shared/selector";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.css",
  viewProviders: [provideIcons({ radixMinus, radixPlus })]
})
export class CartComponent implements OnInit {
  private readonly store: Store<{ cart: Cart }> = inject(Store);
  cart$: Observable<Cart>;
  ngOnInit(): void {
    this.cart$ = this.store.select(selectCart);
  }

  pushDonut(donut: Donuts) {
    this.store.dispatch(CartActions.addToCart({ item: donut }));
  }

  removeFromCart(donut: Donuts) {
    this.store.dispatch(CartActions.removeFromCart({ item: donut }));
  }
}
