import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpHeaders, HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  updateForm: FormGroup;
  user: any = null;

  imagePath: string = "";
  file: File = null;

  width: number = 0;
  loading: boolean = false;

  wrongEmail: boolean = false;

  isLoading: boolean = false;

  @ViewChild("img", {static: true}) img: ElementRef;

  @ViewChild("file", {static: true}) imageBox: ElementRef;

  constructor(private _auth: AuthService, private _http: HttpClient, private _msg: MessagesService) { }

  ngOnInit() {

    this._auth.userEmitter.subscribe((user)=>{
      this.user = user;
      this.setPath(this.user.pic ? this.user.pic : "/assets/images/placeholder.png");
      this.updateForm.setValue({
        email: this.user.email,
        name: this.user.name,
      });
    });


    // Get user
    this.user = this._auth.getUser();
    if(this.user){
      this.setPath(this.user.pic ? this.user.pic : "/assets/images/placeholder.png");
    }


    this.updateForm = new FormGroup({
      email: new FormControl(this.user ? this.user.email : null, {validators: [Validators.required, Validators.email]}),
      name: new FormControl(this.user? this.user.name : null, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)]}),
    });
   
    // Email input subscriber
    this.updateForm.get("email").statusChanges.subscribe(()=>{
      this.wrongEmail = false;
    });


    // Drop event
    this.imageBox.nativeElement.addEventListener("drop", (e: any) => {
      e.stopPropagation();
      e.preventDefault();

      if (e.dataTransfer.files.length) {
        this.storeFile(e.dataTransfer.files[0]);
      }
    });
    // Drag over the element event
    this.imageBox.nativeElement.addEventListener("dragover", (e: any) => {
      e.stopPropagation();
      e.preventDefault();

      e.dataTransfer.dropEffect = "copy";
    });

  }

  update(){
    // Form data
    let fd = new FormData();

    // Append form values
    fd.append("name", this.updateForm.value.name);
    fd.append("email", this.updateForm.value.email);
    if(this.file){
      fd.append("pic", this.file);
    }

    
    let token = this._auth.getToken();
    
    let headers = new HttpHeaders().set("Accept", "application/json").set("Authorization", "Bearer " + token);
    
    this.isLoading = true;

    this._http.post( environment.url + "api/user/settings", fd, {
      headers: headers,
      observe: "events",
      reportProgress: true
    })
    .subscribe(
      (event)=>{
        if(event.type == HttpEventType.UploadProgress){
          this.width = (event.loaded / event.total) * 100;
        } else if (event.type == HttpEventType.Response) {
          this._auth.redirectProfile();
          
          
          this._msg.success("Congratulations!", "Your settings updated successfully");
        }
      },
      (err)=> {
        console.log(err)
        
        if(err.status == 400){
          this.wrongEmail = true;
        } else {
          this.wrongEmail = false;
          this._msg.danger("Error!", "Check you internet connection or try latter.");
        }
        this.isLoading = false;
      },
      ()=>{
        // Done
        this.isLoading = false;
      }
    );


  }


  storeFile(file: File){
    console.log(file.type);
    if(file.size > (1024 * 1024 * 2)){
      return;
    }
    let validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if(validTypes.indexOf(file.type) == -1){
      return;
    }
    
    // Store the file
    this.file = file;
    // this.img.nativeElement.src = URL.createObjectURL(this.file);
    this.setPath(URL.createObjectURL(this.file));
  }

  /**
   * Assign image src attribute
   */
  setPath(path){
    this.img.nativeElement.src = path;
  }

   /**
    * Check if the controller has an erro
    */
   hasError(name: string){
    return this.updateForm.get(name).errors ? true : false;
   }

   error(controlName: string, errorName: string){
     if(this.updateForm.get(controlName).errors){
       if(this.updateForm.get(controlName).errors[errorName]){
         return true;
       }
     }
     return false;
   }

}
