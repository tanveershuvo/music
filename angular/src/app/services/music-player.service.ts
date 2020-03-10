import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
 
  songObserve: Subject<any> = new Subject<any>();

  constructor() { }

  emitSong(song: any){
    this.songObserve.next(song);
  }

}
