import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarDetailService } from 'src/app/services/carDetail.service';
import { CarImageService } from 'src/app/services/carImage.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-carDetail',
  templateUrl: './carDetail.component.html',
  styleUrls: ['./carDetail.component.css']
})
export class CarDetailComponent implements OnInit {
  cars: Car[] = [];
  carId: number;
  carDetails: CarDetail[];
  carImages: CarImage[] = [];
  imageURL: string = "https://localhost:44303"
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private carImageService: CarImageService, private toastrService:ToastrService
    , private cartService:CartService,private carDetailService:CarDetailService) { }
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
      console.log(response.data);
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
  addToCart(car: Car) {
    this.toastrService.success("Sepete eklendi.",car.carName)
    this.cartService.addToCart(car);
  }
}
