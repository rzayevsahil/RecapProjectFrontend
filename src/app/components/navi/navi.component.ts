import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  // userNameSurname: string
  userOrAdmin:string=""

  constructor(
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  method(): boolean {
    let isAdmin = this.localStorageService.getCurrentCustomer()
    
    if (isAdmin) {
      if (isAdmin.userId === 3002) {
        this.userOrAdmin="Yönetici";
        return true;
      }
    }
    this.userOrAdmin="Kullanıcı";
    return false;
  }



  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  signOut() {
    this.localStorageService.removeToken("token");
    this.localStorageService.removeCurrentCustomer();
    this.toastrService.success("Çıkış yapıldı", "Başarılı");
    return this.router.navigateByUrl("/login");
  }

  register(){
    return this.router.navigate(["/register"]);
  }

  getCurrentCustomer(): Customer {
    return this.localStorageService.getCurrentCustomer();
  }



}