import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged: boolean = false;
  token: string;
  

  constructor(private _http: HttpClient, private _router: Router) { }

  /**
   * Return post request to log the user in
   * @param email string
   * @param password string
   */
  login(email: string, password: string){
    
    let headers = new HttpHeaders().set("Accept", "application/json");

    return this._http.post(this.baseURL("oauth/token"), {
      grant_type: "passwrod",
      client_id: "2",
      client_secret: "pSNVxpfyj4A5bma1bcFXVquZNnpqKkR9m2GiVoRn",
      username: email,
      password: password
    }, {
      headers: headers
    });
  }


  /**
   * Return the full URL to the end point
   * @param url string
   */
  baseURL(url: string = ""){
    return "http://music.test/" + url;
  }

  /**
   * Redirect the user to home page
   */
  redirectHome(){
    this._router.navigate(['/']);
  }
}
