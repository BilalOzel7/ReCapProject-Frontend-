import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiURL="https://localhost:44303/api/"
constructor(private httpClient:HttpClient) { }

addCard(card:CreditCard):Observable<ResponseModel>{
  let newPath = this.apiURL + 'creditcards/add';
  return this.httpClient.post<ResponseModel>(newPath, card);
}

isCardExist(card : CreditCard):Observable<ResponseModel>{
  let newPath = this.apiURL + "creditcards/iscardexist";
  console.log(card);
  return this.httpClient.post<ResponseModel>(newPath,card);
};
getCardByNumber(cardNumber : string) : Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiURL + "creditcards/getbycardnumber?cardnumber=" + cardNumber;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
}
updateCard(card:CreditCard){
  let newPath = this.apiURL + "creditcards/update";
  this.httpClient.put(newPath,card);
}
getAllCreditCardByCustomerId(customerId:number):Observable<ListResponseModel<CreditCard>>{
  let newPath=this.apiURL+"creditcards/getallcreditcardbycustomerid="+customerId;
  return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
 }
}
