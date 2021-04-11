import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { Payment } from 'src/app/models/payment/payment';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-card-saved',
  templateUrl: './card-saved.component.html',
  styleUrls: ['./card-saved.component.css']
})
export class CardSavedComponent implements OnInit {

  
  cards: Payment[];
  currentCustomer: Customer;
  
  @Output() selectedCard: EventEmitter<Payment> = new EventEmitter<Payment>();

  constructor(
    private localStorageService:LocalStorageService,
    private paymentService:PaymentService,
    private toastrService:ToastrService,
    private customerService:CustomerService
  ) { }

  ngOnInit(): void {
    this.getCardsByCustomerId();
  }

  getCardsByCustomerId() {
    this.paymentService.getByCustomerId(this.localStorageService.getCurrentCustomer().customerId).subscribe(response => {
       this.cards = response.data;
    });
 }

 selectCard(cardId: number) {
  let selectedCard = this.cards.find(card => card.paymentId == cardId);

  // @ts-ignore
  let newSelectedCard: Card = {
     cardNameSurname: selectedCard.cardNameSurname,
     cardNumber: selectedCard.cardNumber,
     cardExpiryDate: selectedCard.cardExpiryDate,
     customerId: selectedCard.customerId,
     cardCvv: selectedCard.cardCvv
  };

  this.selectedCard.emit(newSelectedCard);
}

}
