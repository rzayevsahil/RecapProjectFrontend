import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { LoginModel } from 'src/app/models/login/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentCustomer:Customer;
  currentCustomerEmail: string = '';
  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private router:Router,
    private customerService:CustomerService
    ) { }

  ngOnInit(): void {
    //this.setCurrentCustomerEmail();
    this.checkUserExists();
  }

  checkUserExists(){
    return this.authService.isAuthenticated() 
              ? this.router.navigateByUrl("/")
              : this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:[this.currentCustomerEmail,Validators.required],
      password:["",Validators.required]
    })
  }
  

  login(){
    if(this.loginForm.invalid){
      this.toastrService.warning("Bütün alanları doldurunuz","Hata");
      return;
    }

      let loginModel:LoginModel=Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success("Başarıyla giriş yapıldı","Başarılı")
        this.localStorageService.setToken("token",response.data.token)
        
        this.setCurrentCustomerByEmail(loginModel.email);
        return this.router.navigateByUrl('/cars');               
      },responseError=>{
        return this.toastrService.error(responseError.error,"Hata");
      })   
    
  }

  setCurrentCustomerByEmail(email:string){
    this.customerService.getCustomerByEmail(email).subscribe(response=>{
      this.currentCustomer=response.data 
      this.localStorageService.setCurrentCustomer(this.currentCustomer)
    })    
  }

  getCustomerByEmail(email: string) {
    this.customerService.getCustomerByEmail(email).subscribe(responseSuccess => {
       this.currentCustomer = responseSuccess.data;
       this.localStorageService.setCurrentCustomer(this.currentCustomer);
    });
 }

}
