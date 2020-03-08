import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  query: string = "";
  songs: any[] = [];

  loading: boolean = false;
  nextPage: string | boolean = true;

  noResutls: boolean = false;

  constructor(private _http: HttpClient, private _route: ActivatedRoute) {}

  ngOnInit() {
    // Get the query
    this.query = this._route.snapshot.paramMap.get("query");

    this._route.paramMap.subscribe(params => {
      this.query = params.get("query");
      this.nextPage = environment.url + "api/search/" + this.query;
      this.songs = [];
      this.noResutls = false;
      this.search();

    })

    this.search();
  }

  search() {

    if(this.loading || this.nextPage == null) return;
    this.loading = true;
    // Search

    this._http
      .get(<string>this.nextPage, {
        headers: new HttpHeaders().set("Accept", "application/json")
      })
      .subscribe(
        (data: any) => {

          this.nextPage = data.next_page_url;

          let newSongs = data.data.map((s)=>{
            s.path = environment.url + s.path;
            s.user.pic = s.user.pic ? environment.url + s.user.pic : null;

            return s;
          });
          this.songs.push(...newSongs);
          console.log("Length:", this.songs.length);
          if(this.songs.length == 0){
            this.noResutls = true;
          }
        },
        (error) => {},
        () => {
          this.loading = false;
        }
      );
  }
}
