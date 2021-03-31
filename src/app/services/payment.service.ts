import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:44358/api/";
  constructor(private httpClient:HttpClient) { } 

  getAllCards(): Observable<ListResponseModel<Payment>>{
    let newPath=this.apiUrl+"payments/getall";
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  }

}
