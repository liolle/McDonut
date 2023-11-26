import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Donuts } from "../../../class/donut/donut";
import {
  FlipBack,
  FlipElement,
  FlipFront,
  FlipTrigger
} from "../../../directives/element-flip/element-flip.directive";

@Component({
  selector: "app-donut-card",
  standalone: true,
  imports: [CommonModule, FlipElement, FlipFront, FlipBack, FlipTrigger],
  templateUrl: "./donut-card.component.html",
  styleUrl: "./donut-card.component.css"
})
export class DonutCardComponent implements OnInit {
  ngOnInit(): void {}
  @Input() donut: Donuts;
}
