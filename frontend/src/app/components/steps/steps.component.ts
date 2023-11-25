import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  featherShoppingCart,
  featherCreditCard,
  featherCoffee
} from "@ng-icons/feather-icons";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
type StepsVariants = "cart" | "card" | "enjoy";

@Component({
  selector: "app-steps",
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  viewProviders: [
    provideIcons({ featherShoppingCart, featherCreditCard, featherCoffee })
  ],
  templateUrl: "./steps.component.html"
})
export class StepsComponent implements OnInit {
  @Input()
  variant!: StepsVariants;

  text = "";
  icon = "";

  ngOnInit() {
    switch (this.variant) {
      case "cart":
        this.text = "Fill your cart";
        this.icon = "featherShoppingCart";
        break;

      case "card":
        this.text = "Check out";
        this.icon = "featherCreditCard";
        break;

      case "enjoy":
        this.text = "Enjoy";
        this.icon = "featherCoffee";
        break;
    }
  }
}
