import { Directive, ElementRef, Input, OnChanges } from "@angular/core";

@Directive({
  selector: "[appSerieCapa]",
})
export class SerieCapaDirective implements OnChanges {
  @Input("url") url: string;

  constructor(private elem: ElementRef) {}

  ngOnChanges() {
    this.elem.nativeElement.style.backgroundImage = `url('${this.url}')`;
  }
}
