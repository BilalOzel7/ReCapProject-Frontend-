import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  rental:Rental
  nameOnTheCard:string;
  cardNumber:string;
  expirationDate:string;
  cardCvv:string;
  moneyInTheCard:number;
  totalRentPrice:number;
  carId:number;
  constructor(private paymentService:PaymentService,private activatedRoute:ActivatedRoute, private router :Router,
    private toastrService:ToastrService,
    private rentalService:RentalService,
    private carService:CarService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['rental']){
        this.rental = JSON.parse(params['rental']);
        console.log(this.rental)
        this.carId=Number(this.rental.carId);
       this.totalRentPrice=Number(this.rental.totalRentPrice);
      }
    });
  }
  rentACar(){
    this.rentalService.addRentals(this.rental).toPromise().then((response)=>{
      if (response.success==true){
        this.toastrService.success("Başarılı","Kiralama İşlemi Tamamlandı")}
        // else{
        //   this.toastrService.error("Hata","Kiralama İşlemi Tamamlanamadı")}
      })
  //  this.toastrService.info("Başarılı","Kiralama İşlemi Tamamlandı")
   this.router.navigate(['/cars']);
}
}
