import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appBottom]'
})
export class BottomDirective {

  @Input("offset") offset: number = 0;
  @Output("appBottom") emitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _element: ElementRef) { }

  @HostListener("document:scroll")
  onscroll(){
    let element = this._element.nativeElement;

    if((element.offsetTop - this.offset) <= (window.scrollY + window.innerHeight)){
      this.emitter.emit();
    }
  }
}
