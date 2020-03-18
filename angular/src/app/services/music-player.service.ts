import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
 
  songObserve: Subject<any> = new Subject<any>();
  playObserve: Subject<boolean> = new Subject<any>();
  playingSong: any = null;

  constructor() { }

  emitSong(song: any){
    this.playingSong = song;
    this.songObserve.next(song);
  }

  play(){
    this.playObserve.next(true);
  }

  pause(){
    this.playObserve.next(false);
  }

}
