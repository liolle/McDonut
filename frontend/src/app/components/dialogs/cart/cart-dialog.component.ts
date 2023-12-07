import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit, inject } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { radixCross2 } from "@ng-icons/radix-icons";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/internal/Observable";
import { Donuts } from "../../../class/donut/donut";
import { Cart } from "../../../interfaces/cart";
import { CartActions } from "../../../shared/actions";
import { DialogData } from "../menu/menu.component";
import { CartComponent } from "../../cards/cart/cart.component";
import { selectCart } from "../../../shared/selector";

@Component({
  selector: "app-cart-dialog",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIconComponent
  ],
  templateUrl: "./cart-dialog.component.html"
})
export class CartDialogComponent implements OnInit {
  private readonly store: Store<{ cart: Cart }> = inject(Store);
  constructor(public dialog: MatDialog) {}

  cart$: Observable<Cart>;

  ngOnInit(): void {
    this.cart$ = this.store.select(selectCart);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CartContentComponent, {
      panelClass: "menu-dialog"
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("The dialog was closed");
    });
  }
}

@Component({
  selector: "app-cart-content-dialog",
  templateUrl: "./cart-body-dialog.component.html",
  styleUrl: "./cart-dialog.component.css",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    NgIconComponent,
    CartComponent
  ],
  viewProviders: [provideIcons({ radixCross2 })]
})
class CartContentComponent implements OnInit {
  private readonly store: Store<{ cart: Cart }> = inject(Store);
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<CartContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  cart$: Observable<Cart>;

  ngOnInit(): void {
    this.cart$ = this.store.select(selectCart);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  navigate(name: string) {
    this.onNoClick();
    this.router.navigate([name]);
  }

  pushDonut(donut: Donuts) {
    this.store.dispatch(CartActions.addToCart({ item: donut }));
  }

  removeFromCart(donut: Donuts) {
    this.store.dispatch(CartActions.removeFromCart({ item: donut }));
  }
}
