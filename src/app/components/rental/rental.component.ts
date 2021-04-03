import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car/carDetail';
import { Customer } from 'src/app/models/customer/customer';
import { Rental } from 'src/app/models/rental/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
   selector: 'app-rental',
   templateUrl: './rental.component.html',
   styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
   customers: Customer[] = [];

   rental: Rental;
   carId: number;
   addRentCarForm: FormGroup;
   currentDate: Date = new Date()
   totalPrice:number = 0;
   carDetail:CarDetail

   rentDate:Date;
   returnDate:Date;

   constructor(
      private formBuilder: FormBuilder,
      private toastrService: ToastrService,
      private rentalService: RentalService,
      private activatedRoute: ActivatedRoute,
      private customerService: CustomerService,
      private router: Router,
      private carservice:CarService
   ) { }

   ngOnInit(): void {
      this.carId = Number(this.activatedRoute.snapshot.paramMap.get('carId'));
      console.log(this.rentDate)
      console.log(this.returnDate)
      this.getCustomerDetails();
      this.createAddRentCarForm();
   }

   getCustomerDetails() {
      this.customerService.getCustomerDetails().subscribe(response => {
         this.customers = response.data;
        this.carservice.getCarDetailByCarId(this.rentalService.getRentingCar().carId)
        this.totalPrice
      })
   }


   createAddRentCarForm() {
      this.addRentCarForm = this.formBuilder.group({
         carId: [this.carId, Validators.required],
         customerId: ['', Validators.required],//******** */
         rentDate: ['', Validators.required],
         returnDate: ['', Validators.required]
      });
   }


   setRentingCar() {
      if (this.addRentCarForm.invalid) {
         this.toastrService.warning('Alanları kontrol ediniz', 'Dikkat');
         return false;
      }
      this.rental = this.addRentCarForm.value;
      let rentDate = new Date(this.rental.rentDate);
      let returnDate = new Date(this.rental.returnDate);
      if (rentDate < this.currentDate) {
         this.toastrService.warning(
            'Kiralama Tarihi, bu günden sonraki günler olmalıdır', 'Dikkat'
         );
         return false;
      }
      if (returnDate < rentDate || returnDate.getDate() == rentDate.getDate()) {
         this.toastrService.warning(
            'Dönüş Tarihi, kiralama tarihinden sonraki günler olmalıdır', 'Dikkat'
         );
         return false;
      }
      this.rentalService.setRentingCar(this.rental);
      this.toastrService.success('Ödeme sayfasına yönlendiriliyorsunuz');
      return this.router.navigate(['/payment']);
   }


   checkCarRentable() {
      this.rentalService.getRentalsByCarId(this.carId).subscribe(responseSuccess => {
         if (responseSuccess.data[0] == null) {
            this.setRentingCar();
            return true;
         }
         let lastItem = responseSuccess.data[responseSuccess.data.length - 1];
         if (lastItem.returnDate == null) {
            return this.toastrService.error('Bu araç henüz teslim edilmemiş');
         }
         let returnDate = new Date(lastItem.returnDate);
         this.setRentingCar();
         if (new Date(this.rental.rentDate) < returnDate) {
            this.rentalService.removeRentingCar();
            return this.toastrService.warning(
               'Bu aracı bu tarihler arasında kiralayamazsınız', 'Dikkat'
            );
         }
         return true;
      });
   } 

   calculatePayment() {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();
      var rentDays = Math.ceil(difference / (1000 * 3600 * 24));
      this.totalPrice = rentDays * this.carDetail.dailyPrice;
    }

    getRentingCar(): Rental {
      return this.rentalService.getRentingCar();
    }
     
}