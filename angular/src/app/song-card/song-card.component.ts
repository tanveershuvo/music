import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent implements OnInit {

  @Input("song") song;

  constructor() { }

  ngOnInit() {
  }

}
