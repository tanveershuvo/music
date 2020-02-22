import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  wrongInfo: boolean = false;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]})
    });
  }

  loginSubmit(){
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    // Log the use in
    this._auth.login(email, password).subscribe(
      (data: any)=>{
        this._auth.storeData(data.expires_in, data.access_token, data.refresh_token)
      },
      (error: any)=>{
        if(error.status == 400){
          this.wrongInfo = true;
        }
      }
    );

  }

  /**
   * Return whether the control is valid or not
   * @param controlName string
   */
  invalid(controlName){
    let control = this.loginForm.get(controlName);
    return control.touched && control.invalid;
  }


}
