import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subject, map } from "rxjs";
import { Cart } from "../../../interfaces/cart";
import {
  CartItem,
  DonutsService
} from "../../../services/donuts/donuts.service";
import { selectCart } from "../../../shared/selector";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="cart$ | async as cart"
      class="flex w-full flex-col items-center justify-center gap-6 font-bold"
    >
      <button
        (click)="checkout()"
        [disabled]="cart.items.size < 1"
        class="w-full rounded-lg bg-accent-2 py-2 font-bold text-accent-fg shadow-md"
      >
        Checkout
      </button>
    </div>
  `,
  styleUrl: "./checkout.component.css"
})
export class CheckoutComponent implements OnInit {
  store: Store<{ cart: Cart }> = inject(Store);
  cart$ = this.store.select(selectCart);
  urlSubject = new Subject<object>();

  donutService = inject(DonutsService);

  url$: Observable<object>;

  ngOnInit(): void {
    this.urlSubject.subscribe((val) => {
      console.log(val);
    });
  }

  checkout() {
    const cartSubscription = this.cart$
      .pipe(
        map((val) => {
          const items: CartItem[] = [];

          for (const donut of val.items) {
            items.push({
              price_id: donut[1].donut.price_id,
              quantity: donut[1].quantity
            });
          }
          return items;
          this.donutService.checkout(items);
        })
      )
      .subscribe((items) => {
        const url = this.donutService.checkout(items);
      });

    //   // var myHeaders = new Headers();
    //   // myHeaders.append("Content-Type", "application/json");

    //   // var raw = JSON.stringify({
    //   //   items: [
    //   //     {
    //   //       price_id: "price_1OL4ORICDGrb7btW5zxCOr1X",
    //   //       quantity: 1
    //   //     }
    //   //   ]
    //   // });

    //   // let requestOptions = {
    //   //   method: "POST",
    //   //   headers: myHeaders,
    //   //   body: raw
    //   // };

    //   // fetch("http://localhost:3333/checkout", requestOptions)
    //   //   .then((response) => response.text())
    //   //   .then((result) => console.log(result))
    //   //   .catch((error) => console.log("error", error));
    // });
  }
}
