import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './jwt.interceptor';
import { Provider } from '@angular/core';
import { ErrorInterceptor } from './errors.interceptor';

export const httpInterceptorsProviders  = [
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
]