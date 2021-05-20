import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModel } from '../models/rentalResponseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiURL="https://localhost:44303/api/rentals/getall"
constructor(private httpClient:HttpClient) { }
getRentals():Observable<RentalResponseModel> {
  return this.httpClient.get<RentalResponseModel>(this.apiURL);
 }
}