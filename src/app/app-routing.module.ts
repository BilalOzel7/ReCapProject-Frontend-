import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarComponent } from './components/car/car.component';
import {CarDetailComponent } from './components/carDetail/carDetail.component'
import { CreditCardComponent } from './components/creditCard/creditCard.component';
import { RentalAddComponent } from './components/rental/rental-add/rental-add.component';
import { RentalComponent } from './components/rental/rental.component';
const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/cardetails/:carId",component:CarDetailComponent},
  {path:"creditcards",component:CreditCardComponent},
  {path:"rentals/getall",component:RentalComponent},
  {path:"rentals/add",component:RentalAddComponent},
  {path:"cars/add",component:CarAddComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
