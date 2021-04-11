import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer/customer';
import { LoginModel } from '../models/login/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/token/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="https://localhost:44358/api/"
  constructor(private httpClient:HttpClient, private localStorageService:LocalStorageService) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath=this.apiUrl+"auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }

  register(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath=this.apiUrl+"auth/register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }  

  update(customer:Customer):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl+"auth/update";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,customer);
  }

  isAuthenticated():boolean {
    return !!this.localStorageService.getToken("token")
  }
}
