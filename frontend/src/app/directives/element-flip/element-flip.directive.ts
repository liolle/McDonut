import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2
} from "@angular/core";

@Directive({
  selector: "[appFlipper]",
  standalone: true
})
export class FlipElement implements OnInit {
  rotateY0 = "rotateY(0deg)";
  rotateY180 = "rotateY(180deg)";

  isFlipped = true;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  ngOnInit(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      "transform-style",
      "preserve-3d"
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      "transition",
      "all 0.5s ease"
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      "-moz-backface-visibility",
      "hidden"
    );
  }

  flip() {
    this.isFlipped = !this.isFlipped;
    if (this.isFlipped) this.el.nativeElement.style.transform = this.rotateY0;
    if (!this.isFlipped)
      this.el.nativeElement.style.transform = this.rotateY180;
  }
}

@Directive({
  selector: "[appFlipFront]",
  standalone: true
})
export class FlipFront implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, "width", "100%");
    this.renderer.setStyle(this.el.nativeElement, "height", "100%");
    this.renderer.setStyle(
      this.el.nativeElement,
      "backface-visibility",
      "hidden"
    );
  }
}

@Directive({
  selector: "[appFlipBack]",
  standalone: true
})
export class FlipBack implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, "width", "100%");
    this.renderer.setStyle(this.el.nativeElement, "height", "100%");
    this.renderer.setStyle(
      this.el.nativeElement,
      "transform",
      "rotateY(180deg)"
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      "backface-visibility",
      "hidden"
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      "-webkit-transform",
      "rotateY(180deg)"
    );
  }
}

@Directive({
  selector: "[appFlipTrigger]",
  standalone: true
})
export class FlipTrigger {
  constructor(private flipCard: FlipElement) {}
  @HostListener("click")
  onClick() {
    this.flipCard.flip();
  }
}
