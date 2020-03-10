import { Component, OnInit, Input } from '@angular/core';
import { MusicPlayerService } from '../services/music-player.service';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent implements OnInit {

  @Input("song") song;

  constructor(private _player: MusicPlayerService) { }

  ngOnInit() {
  }

  playSong(){
    this._player.emitSong(this.song);
  }

}
