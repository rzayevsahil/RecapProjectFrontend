import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color/color';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="https://localhost:44358/api/";
  colorId:number;
  brandId:number;
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath=this.apiUrl+"colors/getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  getColorsById(id:number):Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl+"colors/getbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }
}