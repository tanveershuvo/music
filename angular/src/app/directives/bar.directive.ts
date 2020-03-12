import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appBar]'
})
export class BarDirective {

  @Output("appBar") emitter: EventEmitter<any> = new EventEmitter<any>();
  @Output("finalClick") finalClick: EventEmitter<any> = new EventEmitter<any>();

  isMousedown: boolean = false;

  constructor(private _bar: ElementRef) { }

  @HostListener("click",["$event"])
  onClickEvent(e){
    
    
    let percentage = this.calculatePercentage(e);

    // Make sure the percenate is not negative
    if(percentage < 0){
      percentage = 0;
    } else if (percentage > 1){
      percentage = 1;
    }

    this.emitter.emit(percentage);
    this.finalClick.emit();
    
  }

  @HostListener("document:mousedown", ["$event"])
  mousedown(e){
    // console.log(this._bar.nativeElement.contains(e.target) || this._bar.nativeElement == e.target);
    if(this._bar.nativeElement.contains(e.target) || this._bar.nativeElement == e.target){
      this.isMousedown = true;
    }
  }

  @HostListener("document:mouseup", ["$event"])
  mouseup(e){
    if(this.isMousedown){
      this.finalClick.emit();
    }
    this.isMousedown = false;
  }

  @HostListener("document:mousemove", ["$event"])
  mousemove(e){
    if(!this.isMousedown) return;

    
    let percentage = this.calculatePercentage(e);

    // Make sure the percenate is not negative
    if(percentage < 0){
      percentage = 0;
    } else if (percentage > 1){
      percentage = 1;
    }

    this.emitter.emit(percentage);
    
  }

  calculatePercentage(e){
    let bar = this._bar.nativeElement;

    let offset = e.clientX - bar.offsetLeft;
    let width = bar.clientWidth;

    let percentage =  offset / width;

    return percentage;
  }



}
