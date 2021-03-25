import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { CarImage } from 'src/app/models/carImage/carImage';
import { Color } from 'src/app/models/color/color';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  currentCar: Car;
  carImages: CarImage[] = [];
  default: Car; 
  dataLoaded = false;
  filterCar="";
  colorId:number = 0;
  brandId:number = 0;
  
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['brandId'] && param['colorId']) {
        this.getCarListBrandIdColorId(param['brandId'],param['colorId']);
      } else if (param['brandId']) {
        this.getCarsByBrandId(param['brandId']);
      } else if (param['colorId']) {
        this.getCarsByColorId(param['colorId']);
      } else{
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarListBrandIdColorId(brandId: number, colorId: number) {
    this.carService
      .getCarListBrandIdColorId(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
  }

  setCurrentAllCar() {
    this.currentCar = this.default;
  }

  getCurrentAllCarClass() {
    if (this.currentCar == this.default) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  setSelectedColorId(colorId:number){
    if(this.colorId== colorId){
      return true;
    }else{
      return false;
    }
  }

  setSelectedBrandId(brandId:number){
    if(this.brandId== brandId){
      return true;
    }else{
      return false;
    }
  }

  getSelectedBrandIdColorId(brandId:number,colorId:number){
    if(this.currentCar.brandId == brandId || this.currentCar.colorId == colorId){
      return "btn active";
    }else{
      return "btn";
    }
  }
  setSelectedBrandIdColorId(){
    this.currentCar.brandId=0;
    this.currentCar.colorId=0;
  }


  addToCart(car:Car){
    this.toastrService.show("Sepete")
  }
  
}
