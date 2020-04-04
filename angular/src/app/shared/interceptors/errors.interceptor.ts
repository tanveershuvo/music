import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(private _router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): import("rxjs").Observable<HttpEvent<any>> {    
        return next.handle(req).pipe(catchError(err => {
            if(err.status == 404){
                this._router.navigate(['/404']);
            }
            return throwError(err);
        }));
    }
  
}