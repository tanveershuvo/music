import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private _toastr: ToastrService) { }

  /**
   * Display success message
   * @param header string
   * @param body string
   */
  success(header: string = "", body: string = ""){
    this._toastr.success(body, header, {
      closeButton: true,
      progressBar: true,

    });
  }
  
  /**
   * Display danger message
   * @param header string
   * @param body string
   */
  danger(header: string = "", body: string = ""){
    this._toastr.error(body, header);
  }
}
