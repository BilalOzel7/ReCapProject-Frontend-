import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { NaviComponent } from './components/navi/navi.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/carDetail/carDetail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';

import {ToastrModule} from "ngx-toastr";
import { JwtModule } from '@auth0/angular-jwt';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterBrandPipe } from './pipes/filter-brand.pipe'
import { CreditCardComponent } from './components/creditCard/creditCard.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalAddComponent } from './components/rental/rental-add/rental-add.component';
import { PaymentComponent } from './components/payment/payment.component';



@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    NaviComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    BrandComponent,
    CarDetailComponent,
    VatAddedPipe,
    FilterPipePipe,
    CartSummaryComponent,
    FilterColorPipe ,
    FilterBrandPipe,
    CreditCardComponent,
    CarAddComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    RentalAddComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
 
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
