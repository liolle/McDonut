import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-d-svg ",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "D.html"
})
export class DComponent {}

@Component({
  selector: "app-n-svg ",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./N.html"
})
export class NComponent {}

@Component({
  selector: "app-u-svg ",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "U.html"
})
export class UComponent {}

@Component({
  selector: "app-t-svg ",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "T.html"
})
export class TComponent {}
