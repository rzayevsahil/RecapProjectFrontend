import { Injectable } from '@angular/core';
import { Customer } from '../models/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  tokenKey:string = "token";
  currentCustomer:string = "currentCustomer";
  constructor() { }

  setToken(key:string, value:any) {
    localStorage.setItem(key, value);
 }

 getToken(key:string):any {
    return localStorage.getItem(key);
 }

 removeToken(key:string) {
    localStorage.removeItem(key);
}

setCurrentCustomer(currentCustomerValue:Customer) {
  localStorage.setItem(this.currentCustomer, JSON.stringify(currentCustomerValue));
}

getCurrentCustomer(): Customer {
  var customer = JSON.parse(localStorage.getItem(this.currentCustomer));
  return customer;
}

removeCurrentCustomer() {
  localStorage.removeItem(this.currentCustomer);
}
}
