import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
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

 addRentals(rent:Rental){
  let newPath = this.apiURL + 'rentals/add';
  return this.httpClient.post(newPath, rent).subscribe();
}
}
