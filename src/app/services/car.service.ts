import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiURL="https://localhost:44303/api/"
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath=this.apiURL + "cars/getall"
   return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>> {
    let newPath=this.apiURL + "cars/getbybrand?brandId="+brandId
   return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>> {
    let newPath=this.apiURL + "cars/getbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsDetails(carId:number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiURL + "car/getcarsdetailsbyid?carId=" + carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
}

  getİmagesByCarId(carId : number) : Observable<ListResponseModel<Car>>{
    let newPath = this.apiURL + + "carImages/getimagesbycarid?carid=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
}
}
