import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
// import { request } from 'node:http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorageService:LocalStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token=this.localStorageService.getToken("token");
    if(!token){
      return next.handle(request);
    }
    let newRequest:HttpRequest<any>
    newRequest=request.clone({
      headers:request.headers.set("Authorization","Bearer "+token)
    })
    return next.handle(newRequest);
  }

  
}
