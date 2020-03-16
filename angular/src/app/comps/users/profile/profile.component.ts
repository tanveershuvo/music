import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  query: string = "";
  songs: any[] = [];
  
  user: any = null;

  loading: boolean = false;
  nextPage: string = null;

  constructor(private _http: HttpClient, private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    // Get the query
    this.query = this._route.snapshot.paramMap.get("query");

    this._route.paramMap.subscribe(params => {
      this.query = params.get("query");
      this.nextPage = environment.url + "api/user/" + this.query;
      this.songs = [];
      this.search();
    });

    this.search();
  }

  search() {

    if(this.loading || this.nextPage == null) return;

    this.loading = true;
    
    // Search
    this._http
      .get(this.nextPage, {
        headers: new HttpHeaders().set("Accept", "application/json")
      })
      .subscribe(
        (res: any) => {
          this.nextPage = res.data.next_page_url;
          
          this.user = res.user;
          this.user.pic = this.user.pic ? environment.url + this.user.pic : null;

          let newSongs = res.data.data.map(s => {
            s.path = environment.url + s.path;
            return s;
          });
          
          this.songs.push(...newSongs);
        },
        error => {
          if(error.status == 404){
            this._router.navigate(['/404']);
          }
        },
        () => {
          this.loading = false;
        }
      );
  }

  delete(index: number){
    this.songs.splice(index, 1);
  }

}
