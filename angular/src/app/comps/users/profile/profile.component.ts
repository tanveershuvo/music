import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private _http: HttpClient, private _route: ActivatedRoute) {}

  ngOnInit() {
    // Get the query
    this.query = this._route.snapshot.paramMap.get("query");

    this._route.paramMap.subscribe(params => {
      this.query = params.get("query");

      this.songs = [];
      this.search();
    });

    this.search();
  }

  search() {
    this.loading = true;
    // Search
    this._http
      .get("http://music.test/api/user/" + this.query, {
        headers: new HttpHeaders().set("Accept", "application/json")
      })
      .subscribe(
        (res: any) => {
          this.nextPage = res.last_page_url;
          
          this.user = res.user;
          this.user.pic = this.user.pi ? "http://music.test" + this.user.pic : null;

          let newSongs = res.data.data.map(s => {
            s.path = "http://music.test" + s.path;
            return s;
          });
          
          this.songs.push(...newSongs);
        },
        error => {},
        () => {
          this.loading = false;
        }
      );
  }
}
