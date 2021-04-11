import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/car/carDetail';
import { CarImage } from 'src/app/models/carImage/carImage';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  currentCar: Car;
  carImages: CarImage[] = [];
  default: Car; 
  dataLoaded = false;
  filterCar="";
  colorId:number;
  brandId:number;

  brands: Brand[] = [];
  colors: Color[] = [];
  
  constructor(
    private carService: CarService, 
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private toastrService:ToastrService,
    private colorService: ColorService,
    private brandService: BrandService,
    private router: Router,
    private localStorageService:LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getAllColors();
    this.getAllBrands();
    this.activatedRoute.params.subscribe((param) => {
      if (param['brandId'] && param['colorId']) {
        this.getCarListBrandIdColorId(param['brandId'],param['colorId']);
        this.colorId=param['colorId'];
        this.brandId=param['brandId']
      } else if (param['brandId']) {
        this.getCarsByBrandId(param['brandId']);
        this.brandId=param['brandId'];
        this.colorId=0
      } else if (param['colorId']) {
        this.getCarsByColorId(param['colorId']);
        this.colorId=param['colorId'];
        this.brandId=0
      } else{
        this.colorId=0;
        this.brandId=0
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


  getAllBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getAllColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  filterClick(){
    if (this.brandId >0 && this.colorId > 0) {
      this.router.navigate(['/cars/brand/' + this.brandId +'/color/' +this.colorId])
    } else   if (this.brandId >0) {
      this.router.navigate(['/cars/brand/' + this.brandId ])
    }else    {
      this.router.navigate(['/cars/color/' + this.colorId ])
    }
  }


  
}