import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private httpClient:HttpClient) { }
apiURL="https://localhost:44303/api/"
getByEmail(email:string):Observable<User>{
  return this.httpClient.get<User>(this.apiURL+"users/email?email="+email)
}
getUsers():Observable<ListResponseModel<User>>{
  return this.httpClient.get<ListResponseModel<User>>(this.apiURL + 'users/getall')
}

profileUpdate(user:User):Observable<ResponseModel>{
  console.log(user)
  return this.httpClient.post<ResponseModel>(this.apiURL + 'users/updateprofile', {
    user:{
      'id': user.id,
      'firstName': user.firstName,
      'lastName': user.lastName,
      'email': user.email,
      'status':user.status
    },
    password:user.password
  });
}
getAllCard(customerId : number):Observable<ListResponseModel<CreditCard>>{
  let newPath =this.apiURL + "cards/getallcardbycustomerid?customerId=" + customerId;
  return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
}
deleteCard(cardId : number):Observable<ResponseModel>{
  let newPath =this.apiURL + "cards/deletebycardid";
  return this.httpClient.post<ResponseModel>(newPath,cardId);
}
addCard(card:CreditCard):Observable<ResponseModel> {
  let newPath = this.apiURL +"cards/add";
  return this.httpClient.post<ResponseModel>(newPath, card);
}

}
