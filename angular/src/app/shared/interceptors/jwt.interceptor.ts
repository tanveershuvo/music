import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



export class JWTInterceptor implements HttpInterceptor{

    constructor(private router: Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

        // Add headers
        let access_token = localStorage.getItem("access_token");

        let req = request.clone({
            headers: new HttpHeaders({
                "Accept": "application/json",
                "Authorization": access_token ? "Bearer " + access_token : ""
            })
        }) 
                        
        // Handle the request
        return next.handle(req);
    }
}