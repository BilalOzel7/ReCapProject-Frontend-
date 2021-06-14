import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiURL="https://localhost:44303/api/"
constructor(private httpClient:HttpClient) { }
getCarDetails():Observable<ListResponseModel<CarDetail>>{
  let newPath=this.apiURL+"cars/getcardetails"
  return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
}
getCarDetailsById(id:number):Observable<ListResponseModel<CarDetail>>{
    
  let newPath=this.apiURL+"cars/getcardetailsbyid?carid="+id
  return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  
 }
 getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>> {
  let newPath=this.apiURL + "cars/getbybrand?brandId="+brandId
 return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
}

}
