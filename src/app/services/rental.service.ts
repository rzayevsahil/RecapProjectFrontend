import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental/rental';
import { RentalDetail } from '../models/rental/rentalDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  rentingCar: Rental;
  apiUrl = "https://localhost:44358/api/";

  constructor(private httpClient: HttpClient) { }

  getRentals(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + "rentals/getrentaldetails";
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentalsByCarId(carId: number): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + "rentals/getrentaldetailbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  setRentingCar(rental: Rental) {
    this.rentingCar = rental;
  }

  getRentingCar() {
    return this.rentingCar;
  }

  removeRentingCar() {
    this.rentingCar = null
  }

  add(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + "rentals/add";
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}