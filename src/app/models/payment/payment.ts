export interface Payment{
    paymentId?:number;
    cardNameSurname:string;
    cardNumber:string;
    cardCvv:string;
    cardExpiryDate:string;
    moneyInTheCard:number;
}