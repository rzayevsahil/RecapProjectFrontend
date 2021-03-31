import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer/customer';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  
  apiUrl = 'https://localhost:44358/api/';

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath=this.apiUrl+"customers/getall";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerDetails(): Observable<ListResponseModel<Customer>> {
    let newPath=this.apiUrl+"customers/getcustomerdetail";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerById(customerId: number): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + "customers/getcustomerdetailbycustomerid?customerId=" + customerId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
}