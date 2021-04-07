import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandListComponent } from './components/brand/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorListComponent } from './components/color/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"cars/cardetail/:carId",component:CarDetailComponent},
  {path:"cars/:brandId/:colorId", component: CarComponent },
  {path:"cars/filter/:brandId/:colorId", component:CarComponent},
  {path:"payment", component:PaymentComponent},
  {path:"customer", component:CustomerComponent},

  {path:"carOperations/update/:carId", component:CarUpdateComponent},
  {path:"carOperations", component:CarListComponent},
  //{path:"carAdd", component:CarAddComponent},
  {path:"colorOperations/update/:colorId", component:ColorUpdateComponent},
  {path:"colorOperations", component:ColorListComponent},
  {path:"brandOperations/update/:brandId", component:BrandUpdateComponent},
  {path:"brandOperations", component:BrandListComponent},
  //{path:"cars/cardetail/:carId/rental",component:RentalComponent}
  
  //{path:"cars/cardetail/rental/:carId",component:RentalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }