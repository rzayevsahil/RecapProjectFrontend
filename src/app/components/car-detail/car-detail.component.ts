import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarImage } from 'src/app/models/carImage/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {

  carDetails:Car;
  cardetails : Car[] = [];
  carImages:CarImage[]=[];
  currentImage:CarImage;
  dataLoaded=false;
  
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['carId']){
        this.getCarDetailByCarId(params['carId']);
        this.getImageByCarId(params['carId']);
      };
      
    });
  }



  getImageByCarId(carId:number)
  {
    this.carImageService.getImageByCarId(carId).subscribe(response => {
      this.carImages = response.data;
      this.dataLoaded=true;
      this.currentImage=this.carImages[0];
    });
  }

  getCarDetailByCarId(carId:number)
  {
    this.carService.getCarDetailByCarId(carId).subscribe(response => {
      this.carDetails = response.data[0];
      console.log(response.data);
      this.dataLoaded=true;
    });
  }

  getSliderClassName(carImage:CarImage){
    if(this.currentImage ==carImage){
      return "carousel-item active"
    }else{
      return "carousel-item"
    }

  }


}
