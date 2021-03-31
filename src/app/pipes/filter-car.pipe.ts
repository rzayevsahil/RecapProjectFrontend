import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/car/carDetail';

@Pipe({
  name: 'filterCar'
})
export class FilterCarPipe implements PipeTransform {

  transform(value:CarDetail[], filterCar:string): CarDetail[] {
    filterCar=filterCar?filterCar.toLocaleLowerCase():""
    return filterCar?value.filter((car:CarDetail)=>
    car.colorName.toLocaleLowerCase().indexOf(filterCar)!==-1 ||
    car.brandName.toLocaleLowerCase().indexOf(filterCar)!==-1 ||
    car.modelYear.toString().indexOf(filterCar)!==-1 ||
    car.description.toLocaleLowerCase().indexOf(filterCar)!==-1 ||
    car.dailyPrice.toString().indexOf(filterCar)!==-1
    ):value;
  }

}
