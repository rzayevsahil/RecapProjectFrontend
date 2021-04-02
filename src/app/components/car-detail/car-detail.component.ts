import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/car/carDetail';
import { CarImage } from 'src/app/models/carImage/carImage';
import { Rental } from 'src/app/models/rental/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})

export class CarDetailComponent implements OnInit {

  carDetails: CarDetail;
  cardetails: Car[] = [];
  carImages: CarImage[] = []; 
  currentImage: CarImage;
  dataLoaded = false;
  filterCar = "";
  appRentalClass: string = "display:none;visibility:hidden;";
  deneme: boolean = true;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private rentalService:RentalService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetailByCarId(params['carId']);
      this.getImageByCarId(params['carId']);
    });
  }

  getImageByCarId(carId: number) {
    this.carImageService.getImageByCarId(carId).subscribe(response => {
      this.carImages = response.data;
      this.dataLoaded = true;
      this.currentImage = this.carImages[0];
    });
  }

  getCarDetailByCarId(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe(response => {
      this.carDetails = response.data[0];
      this.dataLoaded = true;
    });
  }

  getSliderClassName(carImage: CarImage) {
    if (this.currentImage === carImage) {
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }

  kirala(){
    if (this.deneme==true) {
    this.appRentalClass="visibility:visible;"
    this.deneme=false;
    }else if(this.deneme==false){
      this.appRentalClass="display:none;visibility:hidden;"
      this.deneme=true;
    }
  }

  
}
