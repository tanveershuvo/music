import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  logged: boolean = false;
  token: string;
  expires_in: number = null;
  access_token: string = null;
  refresh_token: string = null;

  user: any = null; // Authenticated user

  userEmitter: EventEmitter<any> = new EventEmitter<any>();
  statusEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _http: HttpClient, private _router: Router) {
    let expires_in = parseInt(localStorage.getItem("expires_in"));
    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    if (expires_in < Date.now()) {
      this.logged = true;

      // get user
      let user = JSON.parse(localStorage.getItem("user"));

      this.expires_in = expires_in;
      this.access_token = access_token;
      this.refresh_token = refresh_token;

      this.storeData(expires_in, access_token, refresh_token, true);
    }
  }

  /**
   * Return post request to log the user in
   * @param email string
   * @param password string
   */
  login(email: string, password: string) {

    return this._http.post(
      this.baseURL("oauth/token"),
      {
        grant_type: "password",
        client_id: environment.client_id,
        client_secret: environment.client_secret,
        username: email,
        password: password
      }
    );
  }

  /**
   * Return post request to log the user in
   * @param email string
   * @param password string
   */
  register(name: string, email: string, password: string, password_confirmation: string) {

    return this._http.post(
      this.baseURL("api/register"),
      {
        name, email, password, password_confirmation 
      }
    );
  }

  storeData(expires_in: number, access_token: string, refresh_token: string, bootstraping: boolean = false) {
    this.expires_in = expires_in;
    this.access_token = access_token;
    this.refresh_token = refresh_token;

    this.logged = true;
    this.statusEmitter.emit(this.logged);

    // Store in the localstorage
    localStorage.setItem("expires_in", this.expires_in.toString());
    localStorage.setItem("access_token", this.access_token);
    localStorage.setItem("refresh_token", this.refresh_token);

    // Get user info
    this.getUserInfo();

    // Redirect user to home page
    if(!bootstraping){
      this.redirectHome();
    }

  }

  getUserInfo() {

    this._http
      .post(
        this.baseURL("api/me"),
        {}
      )
      .subscribe(
        (user: any) => {
          this.storeUser(user);
        },
        error => {}
      );
  }

  /**
   * Store user data in localstorage and emit user event
   * @param user
   */
  storeUser(user: any) {
    this.user = user;
    this.userEmitter.emit(this.user);
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  /**
   * Return the full URL to the end point
   * @param url string
   */
  baseURL(url: string = "") {
    return environment.url + url;
  }

  /**
   * Redirect the user to home page
   */
  redirectHome() {
    this._router.navigate(["/"]);
  }
  /**
   * Redirect the user to profile page
   */
  redirectProfile() {
    this._router.navigate(["/user", this.user.slug]);
  }

  isLogged() {
    return this.logged;
  }

  getToken() {
    return this.access_token;
  }

  getUser() {
    return this.user;
  }

  logout() {
    this.logged = null;
    this.token = null;
    this.expires_in = null;
    this.access_token = null;
    this.refresh_token = null;

    // Store the song player values
    let volume = localStorage.getItem("volume");

    localStorage.clear(); // Clear the storage
    
    // Set the song player values
    if(volume){
      localStorage.setItem("volume", volume);
    }

    this.userEmitter.emit(null);
    this.statusEmitter.emit(null);

    this.redirectHome();
  }

  changePassword(old: string, newPassword: string, confirm: string) {

    return this._http.post(environment.url + "/api/user/password", {
      old_password: old,
      password: newPassword,
      password_confirmation: confirm
    });
  }


  /**
   * Increase user song number
   * @param n number
   */
  addSongNumber(n: number){
    this.user.songs_number -= n;

    this.userEmitter.next(this.user);
  }


}
