import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  customer:Customer;
  customerUpdateForm:FormGroup;

  constructor(
    private localStorageService:LocalStorageService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getCustomer();
    this.createCustomerUpdateForm();
  }

  getCustomer(){
    this.customer = this.localStorageService.getCurrentCustomer();
  }

  createCustomerUpdateForm(){
    this.customerUpdateForm = this.formBuilder.group({
      customerId:[this.customer.customerId,Validators.required],
      userId:[this.customer.userId,Validators.required],
      firstName:[this.customer.firstName,Validators.required],
      lastName:[this.customer.lastName,Validators.required],
      companyName:[this.customer.companyName,Validators.required],
      email:[this.customer.email,Validators.required],
      findexPoint: [this.localStorageService.getCurrentCustomer().findexPoint, Validators.required],
      password:[""],
      confirmPassword:[""]
    })
  }


  update(){
    if(this.customerUpdateForm.invalid){
      this.toastrService.warning("Bütün alanları doldurduğunuzdan emin olun","Dikkat");
      return;
    }

    if(this.customerUpdateForm.value["password"] != this.customerUpdateForm.value["confirmPassword"]){
      this.toastrService.error("Şifreler birbiriyle eşleşmiyor","Hata");
      return;
    }

    delete this.customerUpdateForm.value["confirmPassword"];

    let customerModel:Customer = Object.assign({},this.customerUpdateForm.value);
    
    this.authService.update(customerModel).subscribe(response => {
      this.localStorageService.removeCurrentCustomer();
      delete customerModel.password;
      this.localStorageService.setCurrentCustomer(customerModel);
      this.router.navigate(["/cars"])
      
      return this.toastrService.success("Bilgileriniz güncellendi","Başarılı");
    },responseError => {
      if(responseError.error.ValidationErrors){
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası");
        }
        return;
      }
      this.toastrService.error(responseError.error.StatusCode + " " + responseError.error.Message, responseError.name)
    });
  }
}
