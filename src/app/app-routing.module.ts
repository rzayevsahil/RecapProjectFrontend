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
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"cars/cardetail/:carId",component:CarDetailComponent},
  {path:"cars/:brandId/:colorId", component: CarComponent },
  {path:"cars/filter/:brandId/:colorId", component:CarComponent},
  {path:"payment", component:PaymentComponent,canActivate:[LoginGuard]},
  {path:"customer", component:CustomerComponent},

  {path:"carOperations/update/:carId", component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"carOperations", component:CarListComponent,canActivate:[LoginGuard]},
  //{path:"carAdd", component:CarAddComponent},
  {path:"colorOperations/update/:colorId", component:ColorUpdateComponent,canActivate:[LoginGuard]},
  {path:"colorOperations", component:ColorListComponent,canActivate:[LoginGuard]},
  {path:"brandOperations/update/:brandId", component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"brandOperations", component:BrandListComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"profile", component:ProfileComponent},

  {path:"home", component:HomeComponent}
  //{path:"cars/cardetail/:carId/rental",component:RentalComponent}
  
  //{path:"cars/cardetail/rental/:carId",component:RentalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }