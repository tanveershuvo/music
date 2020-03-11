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


  constructor(private _player: MusicPlayerService) { }

  ngOnInit() {
    this._player.songObserve.subscribe((song)=>{
      this.song = song;
      this.video.nativeElement.src = this.song.path;
      this.play();
      console.log(this.song);
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

      console.log(video.currentTime);
    });
  }

  close(){
    this.song = null;
    this.video.nativeElement.src = "";
  }

  play(){
    this.video.nativeElement.play();
    this.isPlaying = true;
    console.log(this.video.nativeElement);
  }

  pause(){
    this.video.nativeElement.pause();
    this.isPlaying = false;
  }

  toggle(){
    if(this.isPlaying){
      this.pause();
    } else {
      this.play();
    }
  }
  
  barClicked(e: any){
    
    let bar = document.getElementById("bar");
    let offset = e.clientX - bar.offsetLeft;

    if(offset < 0) return;
    
    // Calculate the seeking time 
    let percentage = ((offset * 100) / bar.clientWidth);
    let currentTime = (percentage * this.video.nativeElement.duration) / 100;
    
    this.video.nativeElement.currentTime = currentTime;
  }


}
