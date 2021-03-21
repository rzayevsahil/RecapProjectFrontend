import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  currentCar:Car;
  default:Car;
  dataLoaded = false;
  constructor(private carService: CarService, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if (params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }else{
        this.getCars()
      }
        
      
    })
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded = true;
    })
  }

  setCurrentAllCar(){
    this.currentCar=this.default;
  }

  getCurrentAllCarClass(){
    if(this.currentCar==this.default){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }


}
