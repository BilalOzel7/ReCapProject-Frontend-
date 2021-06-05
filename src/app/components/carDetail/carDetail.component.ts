import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CarDetailService } from 'src/app/services/carDetail.service';
import { CarImageService } from 'src/app/services/carImage.service';
import { CartService } from 'src/app/services/cart.service';
import { CreditCardService } from 'src/app/services/creditCard.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-carDetail',
  templateUrl: './carDetail.component.html',
  styleUrls: ['./carDetail.component.css']
})
export class CarDetailComponent implements OnInit {
  cars: Car[] = [];
  carImage:CarImage
  carId: number;
  carDetails: CarDetail[]
  rentals:Rental;
  carImages: CarImage[] = [];
  currentImage: CarImage;
  carControl=false
  imageURL: string = "https://localhost:44303"
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private carImageService: CarImageService, private toastrService:ToastrService
    , private cartService:CartService,private carDetailService:CarDetailService,private rentalService:RentalService,
    private router:Router) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailsById(params['carId']);
      this.getByCarId(params['carId'])
    })
  }
  getByCarId(carId: number) {
    this.carImageService.getByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      
   });
   }

  getCarDetailsById(carId:number) {
    
    this.carDetailService.getCarDetailsById(carId).subscribe((response) => {
      this.carDetails = response.data;
      
    });
  }
  getCarDetails(carId:number) {
    this.carDetailService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
  })
}



  getCarById(carId: number) {
    this.carService.getCarsDetails(carId).subscribe((response) => {
      this.cars = response.data;
     
    })
  }
  addToCart(car: CarDetail) {
    this.toastrService.success("Sepete eklendi.",car.carName)
    this.cartService.addToCart(car);
  }
// Rentals(){
    
//     this.router.navigate(['/rentaladd',JSON.stringify(this.carDetails)]);
// }
getSliderClassName(carImage: CarImage) {
  if (this.currentImage === carImage) {
    return "carousel-item active"
  } else {
    return "carousel-item"
  }
}
}
