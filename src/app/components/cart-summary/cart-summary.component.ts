import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CarDetail } from 'src/app/models/carDetail';
import { CartItem } from 'src/app/models/cartItem';
import { Rental } from 'src/app/models/rental';

import { CartService } from 'src/app/services/cart.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
cartItems: CartItem[]=[];
rentals:Rental
  constructor(private cartService:CartService, private toastrService:ToastrService,
   private activatedRoute: ActivatedRoute,private rentalService:RentalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
    this.getCart();

  })
  }
  getCart(){
    this.cartItems=this.cartService.list();
  }

  removeFromCart(car:CarDetail){
    this.cartService.removeFromCart(car);
    this.toastrService.error("Silindi",car.carName+" sepetten silindi.")
  }
  
}
