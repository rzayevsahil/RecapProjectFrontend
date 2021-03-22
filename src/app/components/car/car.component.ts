import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarImage } from 'src/app/models/carImage/carImage';
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
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService
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

  

  
}
