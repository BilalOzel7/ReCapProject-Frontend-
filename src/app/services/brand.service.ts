import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiURL="https://localhost:44303/api/"
constructor(private httpClient:HttpClient) { }
getBrands():Observable<ListResponseModel<Brand>> {
  let newPath = this.apiURL + "brands/getall"
  return this.httpClient.get<ListResponseModel<Brand>>(newPath);
 }
 carsDetails(): Observable<ListResponseModel<CarDetail>> {
  let newPath = this.apiURL + "brands/getcardetails"
  return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);

}
}
