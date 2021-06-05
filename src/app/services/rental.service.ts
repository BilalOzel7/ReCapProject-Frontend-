import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';



@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiURL="https://localhost:44303/api/"
constructor(private httpClient:HttpClient) { }
getRentals():Observable<ListResponseModel<Rental>> {
  let newPath=this.apiURL + "rentals/getall"
  return this.httpClient.get<ListResponseModel<Rental>>(newPath);
 }

 addRentals(rent:Rental):Observable<ResponseModel>{
  let newPath = this.apiURL + 'rentals/add';
  return this.httpClient.post<ResponseModel>(newPath, rent);
}
isRentable(rental:Rental):Observable<ResponseModel>{
  let newPath = this.apiURL + "rentals/isrentable"
  return this.httpClient.post<ResponseModel>(newPath,rental);
}
getAllRentalDetail():Observable<ListResponseModel<RentalDto>> {
  let newPath = this.apiURL + "rentals/getallrentaldetails"
  return this.httpClient
    .get<ListResponseModel<RentalDto>>(newPath);
}
}
