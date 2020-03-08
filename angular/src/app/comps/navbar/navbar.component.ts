import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  logged: boolean = true;
  showMenu: boolean = false;
  user: any = null;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this._auth.userEmitter.subscribe((user)=>{
      this.user = user;
    });
    this._auth.statusEmitter.subscribe((status)=>{
      this.logged = status;
    });
    this.logged = this._auth.logged;
    this.user = this._auth.user;
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  logout(){
    this._auth.logout();
  }

}
