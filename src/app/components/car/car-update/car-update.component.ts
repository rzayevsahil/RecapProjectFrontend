import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup;
  colors:Color[]=[]
  brands:Brand[]=[]
  carId:number
  constructor(
    private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private router:Router,
    private colorService:ColorService,
    private brandService:BrandService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params["carId"]){
        this.carId=params["carId"]
      }
    })
    
    this.getBrands()
    this.getColors()
    this.createCarUpdateForm()
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
    colorId:["",Validators.required],
    brandId:["",Validators.required],
    modelYear:["",Validators.required],
    dailyPrice:["",Validators.required],
    description:["",Validators.required]
    })
    }

  update(){
    if(this.carUpdateForm.valid){
      let carModel:Car=Object.assign({id:this.carId},this.carUpdateForm.value)
      
      this.carService.update(carModel).subscribe(response=>{ 
        this.carService.getCars();
        this.toastrService.success(response.message,"Başarılı") 
        this.router.navigate(["carOperations"]).then(r=>window.location.reload())        
      },responseError=>{
        if (responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      })
    }else{
      this.toastrService.warning("Formunuz eksik","Dikkat!")
    }
  }
}
