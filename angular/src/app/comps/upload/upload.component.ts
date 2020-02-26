import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { HttpClient, HttpHeaders, HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
  uploadForm: FormGroup;

  fileError: string = "";
  @ViewChild("fileNameInput", {static: true}) fileNameInput: ElementRef;

  loading: boolean = false;
  width: number = 0;
  file: File = null;

  // Drop box
  @ViewChild("box", {static: true}) box: ElementRef;

  constructor(private _auth: AuthService, private _http: HttpClient) {}

  ngOnInit() {
    this.uploadForm = new FormGroup({
      name: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      }),
      tags: new FormArray([new FormControl("hiphop"),new FormControl("2pac")], {
        validators: [
          Validators.required,
          Validators.maxLength(5)
        ]
      })
    });

    // ============== Drop Box ==============
    
    // Drop event
    this.box.nativeElement.addEventListener("drop", (e: any) =>{
      e.stopPropagation();
      e.preventDefault();
      
      if(e.dataTransfer.files.length){
        this.storeFile(e.dataTransfer.files[0]);
      }

    })
    // Drag over the element event
    this.box.nativeElement.addEventListener("dragover", (e: any) =>{
      e.stopPropagation();
      e.preventDefault();
      
      e.dataTransfer.dropEffect = "copy";
    })
    

  }

  /**
   * Upload the song to the server
   */
  upload() {
    // Get the token
    let token = this._auth.getToken();
    let headers = new HttpHeaders()
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token);

    // Form data
    let fd = new FormData();

    fd.append("name", this.uploadForm.value.name);

    // Append tags
    for(let i = 0 ; i < this.uploadForm.value.tags.length; i++){
      fd.append("tags[]", this.uploadForm.value.tags[i]);
    }
    
    fd.append("song", this.file);
    // Upload file
    this.loading = true;
    this._http
      .post("http://music.test/api/songs", fd,{
        headers: headers,
        reportProgress: true,
        observe: "events"
      })
      .subscribe(
        (event: any) => {
          
          // Upload progress
          if(event.type == HttpEventType.UploadProgress){
            this.width = (event.loaded / event.total) * 100;
            console.log(this.width + "%");
            return;
          }

          // console.log(event);
        },
        error => {
          console.log(error);
        },
        () => {
          this.loading = false;
        }
      );
  }

  /**
   * Storing the file in "virable" after validating it
   * @param file 
   */
  storeFile(file: File){

    if(file.size > 1024 * 1024 * 8){ // File greater than 8MB
      this.fileError = "The song can't be larger than 8MB";
      return;
    } else if ( file.type != "audio/mpeg") { // Not a song file
      this.fileError = 'The file must be of type "audio/mpeg"';
      return;
    }
    
    // Store file info and clear file errors
    this.file = file;
    this.fileNameInput.nativeElement.value = this.file.name;
    this.fileError = "";

  }
}
