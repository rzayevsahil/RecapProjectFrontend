export interface Payment{
    paymentId?:number;
    customerId:number;
    cardNameSurname:string;
    cardNumber:string;
    cardCvv:string;
    cardExpiryDate:string;
}