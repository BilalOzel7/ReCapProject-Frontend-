import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


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
    let newPath = this.apiURL + "cars/getcarsdetailsbyid?carId=" + carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
}
carsDetails(): Observable<ListResponseModel<CarDetail>> {
  let newPath = this.apiURL + "cars/getcardetails"
  return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
}

  getİmagesByCarId(carId : number) : Observable<ListResponseModel<Car>>{
    let newPath = this.apiURL + + "carImages/getimagesbycarid?carid=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
}

  add(car:Car):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiURL +"cars/add",car)
}
}
