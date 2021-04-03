import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car/carDetail';
import { Customer } from 'src/app/models/customer/customer';
import { Payment } from 'src/app/models/payment/payment';
import { Rental } from 'src/app/models/rental/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  carId: number;
  carDetail: CarDetail;
  rental: Rental;
  costomer: Customer
  payments: Payment[] = [];
  dataLoaded = false;

  cardNameSurname: string;
  cardNumber: string;
  cardCvv: string;
  cardExpiryDate: any;
  moneyInTheCard: number;
  card: Payment;
  //cardAddForm: FormGroup;
  customerId: number;

  // rentDate: Date;
  // returnDate: Date;
  payment: Payment;
  rentedCar: Rental;
  totalPrice: number = 0;
  paymentAmount: number = 0;
  cardExist: boolean = false;
  getCustomerId: number;
  customer: Customer;

  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,

  ) { }

  ngOnInit(): void {
    this.carId = Number(this.activatedRoute.snapshot.paramMap.get('carId'));
    // this.activatedRoute.params.subscribe(params=>{
    //   if (params['rental']) {
    //     this.rental = JSON.parse(params['rental']);
    //     this.getCustomerId =JSON.parse(params['rental']).customerId;
    //     this.getCustomerDetailById(this.getCustomerId);
    //     this.getCarDetails();
    //   }
    // })
    this.getCarDetailByCarId();
    // this.getRentAndReturnDate();

    // if(!this.rentalService.getRentingCar()){
    //   this.toastrService.error("Hatalı işlem", "Dikkat")
    //   this.router.navigate(['']);
    //   return;
    // }
  }

  getCustomerDetailById(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe((response) => {
      this.customer = response.data[0];
    })
  }

  getCarDetails() {
    this.carService.getCarDetailByCarId(this.rental.carId).subscribe(response => {
      this.carDetail = response.data[0];
      this.calculatePayment();
    })
  }

  getCustomerInfo() {
    this.paymentService.getByCustomerId(this.getRentingCar().customerId).subscribe(response => {
      this.payment = response.data[0];
      this.carId = this.getRentingCar().carId;
    })
  }

  // getRentAndReturnDate() {
  //   this.rentDate = this.getRentingCar().rentDate;
  //   this.returnDate = this.getRentingCar().returnDate;
  // }

  getRentingCar(): Rental {
    return this.rentalService.getRentingCar();
  }


  getCarDetailByCarId() {
    this.carService.getCarDetailByCarId(this.getRentingCar().carId).subscribe(response => {
      this.carDetail = response.data[0];
      this.calculatePayment();
    })
  }

  calculatePayment() {
    var date1 = new Date(this.getRentingCar().returnDate.toString());
    var date2 = new Date(this.getRentingCar().rentDate.toString());
    var difference = date1.getTime() - date2.getTime();
    var rentDays = Math.ceil(difference / (1000 * 3600 * 24));
    this.totalPrice = rentDays * this.carDetail.dailyPrice;
  }

  async rentACar() {
    let verifyCard: Payment = {
      cardNameSurname: this.cardNameSurname,
      cardNumber: this.cardNumber,
      cardExpiryDate: this.cardExpiryDate,
      cardCvv: this.cardCvv,
      customerId: this.customerId,
      moneyInTheCard: this.moneyInTheCard
    }

    this.cardExist = await this.isCardExist(verifyCard);
    if (this.cardExist) {
      this.card = await this.getCreditCardByCardNumber(this.cardNumber);
      if (this.card.moneyInTheCard as number >= (this.totalPrice*0.9)) {
        this.card.moneyInTheCard = this.card.moneyInTheCard - this.totalPrice*0.9;
        this.updateCard(verifyCard);
        this.rentalService.addRental(this.getRentingCar()).subscribe();
        
        this.toastrService.success('Arabayı kiraladınız', 'İşlem başarılı');
        this.router.navigate(['/cars']);
      } else {
        this.toastrService.error('Kartınızda yeterli bakiye yoktur', 'Hata');
      }
    } else {
      this.toastrService.error('Yanlış bilgi! Bankanız bilgilerinizi onaylamadı', 'Hata');
    }
  }

  async isCardExist(card: Payment) {
    return (await this.paymentService.verifyCard(card).toPromise()).success;
  }

  async getCreditCardByCardNumber(cardNumber: string) {
    return (await this.paymentService.getByCardNumber(cardNumber).toPromise()).data[0];
  }

  updateCard(card: Payment) {
    this.paymentService.updateCard(card);
  }
}