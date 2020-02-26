import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

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

  constructor(private _http: HttpClient, private _route: ActivatedRoute) {}

  ngOnInit() {
    // Get the query
    this.query = this._route.snapshot.paramMap.get("query");

    this._route.paramMap.subscribe(params => {
      this.query = params.get("query");
      this.nextPage = "http://music.test/api/search/" + this.query;
      this.songs = [];
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
            s.path = "http://music.test" + s.path;
            s.user.pic = s.user.pic ? "http://music.test" + s.user.pic : null;

            return s;
          });
          this.songs.push(...newSongs);
        },
        (error) => {},
        () => {
          this.loading = false;
        }
      );
  }
}
