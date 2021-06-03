import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './localStorage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserId: number;
  jwtHelperService:JwtHelperService = new JwtHelperService();
  apiURL="https://localhost:44303/api/auth/";
  constructor(private httpClient: HttpClient,private storageService:LocalStorageService) {this.setUserStats() }

  login(loginModel: LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiURL+"login",loginModel)
  }
  isAuthenticated() {
    if(localStorage.getItem){
      return true;
    }else{
      return false;
    }
  }
  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiURL + 'register',registerModel);
  }
  logout(){
    this.storageService.remove("token");
  }
  setCurrentUserId(){
    var decoded = this.getDecodedToken()
    var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
    this.currentUserId = Number(decoded[propUserId]);
  }

  getCurrentUserId():number {
    return this.currentUserId
  }
  getDecodedToken(){
    try{
      return this.jwtHelperService.decodeToken(this.storageService.getToken());
    }
    catch(Error){
        return null;
    }
  }
  async setUserStats(){
    if(this.loggedIn()){
      this.setCurrentUserId()
      
    
    }
}
loggedIn(): boolean {
  let isExpired = this.jwtHelperService.isTokenExpired(this.storageService.getToken());
  return !isExpired;
}
}
