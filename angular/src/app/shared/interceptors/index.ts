import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './jwt.interceptor';
import { Provider } from '@angular/core';

export const httpInterceptorsProviders  = [
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true}
]