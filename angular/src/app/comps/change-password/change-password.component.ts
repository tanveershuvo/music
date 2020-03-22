import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;

  wrongPassword: boolean = false;

  isLoading: boolean = false;

  constructor(private _auth: AuthService, private _msg: MessagesService) { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      old_password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]}),
      password_confirmation: new FormControl(null, {validators: [Validators.required]}),
    });
  }

  changePassword(){
    let value = this.passwordForm.value;

    this.isLoading = true;

    this._auth.changePassword(value.old_password, value.password, value.password_confirmation).subscribe(
      (data)=>{
        this._auth.redirectProfile();
        this._msg.success("Congratulations!", "Your password updated successfully.");
      },
      (err)=>{
        if(err.status == 400){ // Wrong password
          this.wrongPassword = true
        } else {
          
          this._msg.danger("Error!", "Check your internet connection or try latter");
        }
        this.isLoading = false;
      },
      ()=>{
        this.isLoading = false;
      },
    );
  }

  notMatched(){
    return this.passwordForm.value.password != this.passwordForm.value.password_confirmation;
  }

}
