import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { Payment } from 'src/app/models/payment/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  carId: Car;
  payments: Payment[] = [];
  dataLoaded = false;

  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private rentalService: RentalService
  ) { }

  ngOnInit(): void {
    this.getAllCards()
    
    // if(!this.rentalService.getRentingCar()){
    //   this.toastrService.error("Hatalı işlem", "Dikkat")
    //   this.router.navigate(['']);
    //   return;
    // }
  }

  getAllCards() {
    this.paymentService.getAllCards().subscribe(response => {
      this.payments = response.data;
      this.dataLoaded = true;
    })
  }
}