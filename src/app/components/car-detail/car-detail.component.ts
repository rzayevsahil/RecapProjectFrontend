import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/car/carDetail';
import { CarImage } from 'src/app/models/carImage/carImage';
import { Customer } from 'src/app/models/customer/customer';
import { Rental } from 'src/app/models/rental/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
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
  currentCustopmerOfFindexPoint: number;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private rentalService:RentalService,
    private localStorageService:LocalStorageService,
    private authService:AuthService,
    private toastrService:ToastrService
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
    if(this.isLogin()){
      if (this.deneme==true) {
        this.appRentalClass="visibility:visible;"
        this.deneme=false;
        }else if(this.deneme==false){
          this.appRentalClass="display:none;visibility:hidden;"
          this.deneme=true;
        }
    }else{
      this.toastrService.warning("Araba kiralamak için önce giriş yapmalısınız","Dikkat");
    }
    
  }

  findexPoint():boolean{
    let currentCustomer = this.localStorageService.getCurrentCustomer()

    if (currentCustomer) {
      this.currentCustopmerOfFindexPoint = currentCustomer.findexPoint

      if(this.currentCustopmerOfFindexPoint < this.carDetails.findexPoint){
        return true;
     }
    }

    return false;
 }

 isLogin(){
  if(this.authService.isAuthenticated()){
    return true;
  }
  
  return false;
}

  method(): boolean {
    let isAdmin = this.localStorageService.getCurrentCustomer()
    
    if (isAdmin) {
      if (isAdmin.userId === 3002) {
        return true;
      }
    }
    return false;
  }
  
}
