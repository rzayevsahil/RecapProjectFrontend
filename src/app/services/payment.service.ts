import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment/payment';
import { Rental } from '../models/rental/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:44358/api/";
  constructor(private httpClient:HttpClient) { } 

  addPayment(payment: Payment): Observable<ResponseModel> {
    let newPath=this.apiUrl+"payments/add";
    return this.httpClient.post<ResponseModel>(newPath,payment);
 }

 getByCustomerId(customerId: number): Observable<ListResponseModel<Payment>> {
    let getByCustomerPath = this.apiUrl + "payments/getbycustomerId?customerId=" + customerId;
    return this.httpClient.get<ListResponseModel<Payment>>(getByCustomerPath);
 }

 verifyCard(card:Payment):Observable<ResponseModel>{
  let newPath = this.apiUrl+"payments/verifycard";
  return this.httpClient.post<ResponseModel>(newPath,card);
}

getByCardNumber(cardNumber:string):Observable<ListResponseModel<Payment>>{
  let newPath = this.apiUrl+"payments/getbycardnumber?cardNumber="+cardNumber;
  return this.httpClient.get<ListResponseModel<Payment>>(newPath);
}

updateCard(card:Payment){
  let newPath = this.apiUrl+"payments/update";
  this.httpClient.put(newPath,card);//neden httpClient.post() kullanmadık?
}

// pay(rental:Rental,amount:number){
//   let path = this.apiUrl + "rentals/paymentadd";//paymentadd yok(Melih'de de yok)
//   //rental.returnDate = undefined;
//   this.httpClient.post<ResponseModel>(path,{payment:{amount:amount},rental:rental})
// }
}
