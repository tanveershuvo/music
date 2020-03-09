import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;

  wrongPassword: boolean = false;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      old_password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]}),
      password_confirmation: new FormControl(null, {validators: [Validators.required]}),
    });
  }

  changePassword(){
    let value = this.passwordForm.value;
    this._auth.changePassword(value.old_password, value.password, value.password_confirmation).subscribe(
      (data)=>{
        this._auth.redirectProfile();
      },
      (err)=>{
        if(err.status == 400){ // Wrong password
          this.wrongPassword = true
        } 
      },
      ()=>{},
    );
  }

  notMatched(){
    return this.passwordForm.value.password != this.passwordForm.value.password_confirmation;
  }

}
