import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appBar]'
})
export class BarDirective {

  @Output("appBar") emitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _bar: ElementRef) { }

  @HostListener("click",["$event"])
  onClickEvent(e){
    
    let bar = this._bar.nativeElement;

    let offset = e.clientX - bar.offsetLeft;
    let width = bar.clientWidth;

    let percentage =  offset / width;

    // Make sure the percenate is not negative
    if(percentage >= 0){
      this.emitter.emit(percentage);
    }
    
  }

}
