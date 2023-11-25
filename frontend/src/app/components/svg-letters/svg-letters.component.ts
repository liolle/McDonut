import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "D-SVG",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "D.html"
})
export class DComponent {}

@Component({
  selector: "N-SVG",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./N.html"
})
export class NComponent {}

@Component({
  selector: "U-SVG",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "U.html"
})
export class UComponent {}

@Component({
  selector: "T-SVG",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "T.html"
})
export class TComponent {}
