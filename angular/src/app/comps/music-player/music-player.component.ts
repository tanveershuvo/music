import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MusicPlayerService } from 'src/app/services/music-player.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit, AfterViewInit {

  song: any = null;
  @ViewChild("video", {static: true}) video: ElementRef;

  // Video properties
  isPlaying: boolean = false;
  currentTime: string = "0:00";
  barWidth: string = "0%";  // Player progress bar width
  volumeWidth: number = 50;  // Volume progress bar width
  lastVolume: number = 50;  // Last volume value before muting
  isMuted: boolean = false;
  isLoop: boolean = false;


  constructor(private _player: MusicPlayerService) { }

  ngOnInit() {
    this._player.songObserve.subscribe((song)=>{
      if(song == null) return;
      
      this.song = song;
      this.video.nativeElement.src = this.song.path;

      // Default values
      this.isPlaying = false;
      this.currentTime = "0:00";
      this.barWidth = "0%";
      this.volumeWidth = this.video.nativeElement.volume * 100;
      
      // Disable looping
      if(this.isLoop){
        this.toggleLoop();
      }

      this.play();
      console.log(this.song);
    });

    this._player.playObserve.subscribe( play =>{ 
      console.log("Play:", play);
      if(play){
        this.video.nativeElement.play();
        this.isPlaying = true;
      } else {
        this.video.nativeElement.pause();
        this.isPlaying = false;
      }
    });
  }

  ngAfterViewInit(){
    // Native element
    let video = this.video.nativeElement;
    video.addEventListener("timeupdate", ()=>{
      let time = video.currentTime;
      
      // Format the time
      time = parseInt(time);

      let minuts : any = parseInt((time / 60).toString());
      let sec : any = time % 60;

      sec = sec < 10 ? '0' + sec : sec;

      this.currentTime = minuts + ":" + sec;

      // Chagne progress width
      this.barWidth = ((video.currentTime / video.duration) * 100) + "%"; 

      // console.log(video.currentTime);

      // Return the bar to the begining
      if(video.duration == video.currentTime){
        video.currentTime = 0;
        this.pause();
      }
    });

    // Volume bar position
    video.addEventListener("volumechange",()=>{
        let volume = video.volume;

        // Get width percentage
        this.volumeWidth = volume * 100;
    })


  }

  // Close the song & hide song player
  close(){
    this.song = null;
    this.video.nativeElement.src = "";
    this._player.songObserve.next(null);
  }

  // Play the song
  play(){
    // this.video.nativeElement.play();
    // this.isPlaying = true;
    this._player.playObserve.next(true);
  }

  // Pause the song
  pause(){
    // this.video.nativeElement.pause();
    // this.isPlaying = false;
    this._player.playObserve.next(false);
  }

  // Play & pause the song
  toggle(){
    if(this.isPlaying){
      this.pause();
    } else {
      this.play();
    }
  }
  
  
  // Change song current time
  songBar(percentage: any){

    // Get the current time depends on the percentage
    let time = percentage * this.video.nativeElement.duration;  
    this.video.nativeElement.currentTime = time;

    this.video.nativeElement.pause(); 
  }


  // Change song volume
  soundBar(percentage: any){
    let soundVolume = percentage * 1; // sound volume
    this.video.nativeElement.volume = soundVolume;
    
    if(this.isMuted){
      this.toggleMute();
    }

  }

  finalClick(){
    if(this.isPlaying){
      this.video.nativeElement.play(); 
    }
  }

  // Mute and unmute
  toggleMute(){
    if(this.isMuted){
      this.isMuted = false;
    } else {
      this.isMuted = true;
    }
    this.video.nativeElement.muted = this.isMuted;
  }


  toggleLoop(){
    if(this.isLoop){
      this.isLoop = false;
    } else {
      this.isLoop = true;
    }
    this.video.nativeElement.loop = this.isLoop;
  }

}
