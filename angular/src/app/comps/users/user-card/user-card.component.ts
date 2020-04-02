import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input("user") user: any;

  loggedUser: any = null;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this.loggedUser = this._auth.getUser();
    this._auth.userEmitter.subscribe((user)=>{
      this.loggedUser = user;
    });
  }

}
