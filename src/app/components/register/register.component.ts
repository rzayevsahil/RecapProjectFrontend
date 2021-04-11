import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { RegisterModel } from 'src/app/models/register/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  currentCustomer:Customer;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router,   
    private customerService:CustomerService 
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      companyName: ["",Validators.required],
      findexPoint: [70, Validators.required]
    })
  }

  register(){
    if (this.registerForm.invalid) {
      this.toastrService.warning("Bütün alanları doldurunuz", "Dikkat");
      return;
    }

    if (this.registerForm.value["password"] != this.registerForm.value["confirmPassword"]) {
      this.toastrService.error("Şifreler eşleşmiyor", "Hata");
      return;
    }

    delete this.registerForm.value["confirmPassword"];
    let registerModel:RegisterModel = Object.assign({}, this.registerForm.value);

    this.authService.register(registerModel).subscribe(response => {
      this.localStorageService.setToken("token", response.data.token);
      this.getCurrentCustomerByEmail(registerModel.email)
      this.toastrService.success("Kayıt oldunuz", "Başarılı");
      return this.router.navigateByUrl('/login');
    }, responseError => {
      if (responseError.error.Errors) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, 'Doğrulama Hatası');
        }
        return;
      }
      this.toastrService.error(responseError.status + ' ' + responseError.name, responseError.error);
    });
  }

  getCurrentCustomerByEmail(email:string){
    this.customerService.getCustomerByEmail(email).subscribe(response=>{
      this.currentCustomer=response.data 
      this.localStorageService.setCurrentCustomer(this.currentCustomer)
    })    
  }
}
