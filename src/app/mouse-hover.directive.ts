import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appMouseHover]", // attribute selector
  standalone: true,
})
export class MouseHoverDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener("mouseenter")
  onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      "background-color",
      "lightblue"
    );
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, "background-color");
  }
}
