import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  nextPage: string = null;
  loading: boolean = false;
  first: boolean = true;

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {

    if (this.nextPage == null && !this.first) return;
    
    let url = this.nextPage ? this.nextPage : "http://music.test/api/users";
    
    let headers = new HttpHeaders().set("Accept", "application/json");

    this.loading = true;
    
    this._http.get(url).subscribe(
      (data: any) => {
        let newUsers = data.data.map(u => {
          u.pic = u.pic ? "http://music.test" + u.pic : null;
          return u;
        });
        this.users.push(...newUsers);
      },
      error => {
        console.table(error);
      },
      () => {
        this.loading = false;
      }
    );

    this.first = false;
  }
}
