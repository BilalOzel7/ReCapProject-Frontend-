import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;
  currentCustomer: string = 'currentCustomer';
  tokenKey = "token"
  currentUser: string = 'currentUser';
constructor() { }
get(key : string){
  return this.localStorage.getItem(key);
}

set(key: string, value: string){
  this.localStorage.setItem(key,value);
}

remove(key: string){
  this.localStorage.removeItem(key);
}

clean(){
  this.localStorage.clear();
}

get isLocalStorageSupported(): boolean{return !!localStorage}

getLocalStorage(key:string){
  return localStorage.getItem(key);
}
addToken(tokenDetail:TokenModel){
  localStorage.setItem("token",tokenDetail.token);
  localStorage.setItem("expiration",tokenDetail.expiration)
}
getCurrentCustomer():Customer{
  return JSON.parse(localStorage.getItem(this.currentCustomer));
}
setCurrentCustomer(customer : Customer){
  localStorage.setItem(this.currentCustomer,JSON.stringify(customer));
}
removeCurrentCustomer(){
  localStorage.removeItem(this.currentCustomer);
}
setToken(token:string){
  localStorage.setItem(this.tokenKey,token);
}
getToken(){
  return localStorage.getItem(this.tokenKey);
}
removeToken(){
  localStorage.removeItem(this.tokenKey);
}
getUserNameDecodeToken(){
  let token = this.getLocalStorage("token");
  let name : string = String(Object.values(jwtDecode(token))[2]);
  return name;
  }
  removeLocalStorage(key:string)
  {
    return localStorage.removeItem(key);
  }
  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem(this.currentUser));
  }
  getIdDecodeToken()
  {
    let token = this.getLocalStorage("token");
    let id:number = Number(Object.values(jwtDecode(token))[0]);
    return id;
  }
  
  getMailDecodeToken()
  {
    let token =this.getLocalStorage("token");
    let mail:string = String(Object.values(jwtDecode(token))[1]);
    return mail;
  }
  removeCurrentUser() {
    localStorage.removeItem(this.currentUser);
  }

}
