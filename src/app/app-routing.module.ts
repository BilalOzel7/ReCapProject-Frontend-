import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarComponent } from './components/car/car.component';
import { HomeComponent } from './components/home/home.component';
import {CarDetailComponent } from './components/carDetail/carDetail.component'
import { CreditCardComponent } from './components/creditCard/creditCard.component';
import { LoginComponent } from './components/login/login.component';
import { RentalAddComponent } from './components/rental/rental-add/rental-add.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { PaymentComponent } from './components/payment/payment.component';
const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/cardetails/:carId",component:CarDetailComponent},
  {path:"creditcards",component:CreditCardComponent},
  {path:"rentals/getall",component:RentalComponent},
  {path:"rentals",component:RentalComponent},
  {path:"cars/add",component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"rentaladd/:car",component:RentalAddComponent},
  {path:"payment",component:PaymentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
