import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  logged: boolean = false;

  constructor(private _auth: AuthService) {
    this.logged = this._auth.isLogged();
   }

  ngOnInit() {
    this._auth.statusEmitter.subscribe(status => {
      this.logged = status;
    });
  }

}
