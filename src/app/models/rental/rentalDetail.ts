import { Rental } from "./rental";

export interface RentalDetail extends Rental{

    brandName:string;
    colorName:string;
    companyName:string;
    carModelYear:number;
    carDailyPrice:string;
    carDescription:string;
    customerFirstName:string;
    customerLastName:string; 
}