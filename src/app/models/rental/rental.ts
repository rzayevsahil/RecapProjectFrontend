export interface Rental{
    id:number;
    carId:number;
    brandName:string;
    colorName:string;
    customerId:number;
    customerFirstName:string;
    customerLastName:string; 
    rentDate:Date;
    returnDate:Date;
}