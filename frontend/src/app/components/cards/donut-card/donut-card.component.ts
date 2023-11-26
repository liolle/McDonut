import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Donuts } from "../../../class/donut/donut";
import {
  FlipBackDirective,
  FlipElementDirective,
  FlipFrontDirective,
  FlipTriggerDirective
} from "../../../directives/element-flip/element-flip.directive";

@Component({
  selector: "app-donut-card",
  standalone: true,
  imports: [
    CommonModule,
    FlipBackDirective,
    FlipElementDirective,
    FlipFrontDirective,
    FlipTriggerDirective
  ],
  templateUrl: "./donut-card.component.html"
})
export class DonutCardComponent {
  @Input() donut: Donuts;
}
