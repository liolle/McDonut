import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { Donuts } from "../../../class/donut/donut";
import {
  FlipBackDirective,
  FlipElementDirective,
  FlipFrontDirective,
  FlipTriggerDirective
} from "../../../directives/element-flip/element-flip.directive";
import { Store } from "@ngrx/store";

import {
  radixDoubleArrowRight,
  radixDoubleArrowLeft,
  radixDot
} from "@ng-icons/radix-icons";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { CartActions } from "../../../shared/actions";

@Component({
  selector: "app-donut-card",
  standalone: true,
  imports: [
    CommonModule,
    FlipBackDirective,
    FlipElementDirective,
    FlipFrontDirective,
    FlipTriggerDirective,
    NgIconComponent
  ],
  templateUrl: "./donut-card.component.html",
  viewProviders: [
    provideIcons({ radixDoubleArrowRight, radixDoubleArrowLeft, radixDot })
  ]
})
export class DonutCardComponent {
  private readonly store: Store = inject(Store);

  @Input() donut: Donuts;

  pushDonut() {
    this.store.dispatch(CartActions.addToCart({ item: this.donut }));
  }
}
