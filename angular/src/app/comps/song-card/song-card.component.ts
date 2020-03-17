import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MusicPlayerService } from '../../services/music-player.service';
import { AuthService } from '../../services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent implements OnInit {

  @Input("song") song;
  @Input("user") user: any;
  @Output("deleted") deleted: EventEmitter<any> = new EventEmitter();
  isOwner: boolean = false;
  isPlaying: boolean = false;
  playingSong: any = null;

  constructor(private _player: MusicPlayerService, private _auth: AuthService, private _http: HttpClient) { }

  ngOnInit() {
    if(this.user){
      this.song.user = this.user;
    }
    
    // console.log(this._auth.getUser().id, this.song.user.id);
    console.log(this._auth.isLogged());
    if(this._auth.isLogged()){
      
      if(!this._auth.getUser()){
        let interval = setInterval(()=>{
          
          if(this._auth.getUser()){            
            if(this._auth.user.id == this.song.user.id){
              this.isOwner = true;
            }
            clearInterval(interval);
          }
        }, 1000);
      } else {
        if(this._auth.user.id == this.song.user.id){
          this.isOwner = true;
        }

      }
    }

    // Playing song
    this._player.songObserve.subscribe((song)=>{
      this.playingSong = song;
      this.isPlaying = this.playingSong.id == this.song.id;
    });

    // Play or Pause observer
    this._player.playObserve.subscribe(play => {

      
      if(!this.playingSong || this.playingSong.id != this.song.id) return;

      this.isPlaying = play;

    });
  }

  playSong(){

    if(this.playingSong && this.playingSong.id == this.song.id){
      
      if(this.isPlaying){
        this._player.pause();
      } else {
        this._player.play();
      }
      
    } else {
      this._player.emitSong(this.song);
    }
    
  }
  
  


  // Delete the song
  delete(){
    if(!confirm(`Are you sure you want to delete "${this.song.name}"?`)){
      return;
    }

    let token = this._auth.getToken();

    let headers = new HttpHeaders()
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + token);

    this._http.delete(environment.url + "api/songs/" + this.song.id, {
      headers: headers
    }).subscribe(
      ()=>{
        this.deleted.emit();
      },
      ()=>{},
      ()=>{},
    );
    

  }


}
