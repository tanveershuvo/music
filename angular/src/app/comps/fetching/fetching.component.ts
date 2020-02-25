import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fetching',
  templateUrl: './fetching.component.html',
  styleUrls: ['./fetching.component.scss']
})
export class FetchingComponent implements OnInit {

  @Output("bottom") bottom: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  fire(){
    this.bottom.emit();
  }

}
