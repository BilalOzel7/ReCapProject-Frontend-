import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';

import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/carImage.service';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { CarImage } from 'src/app/models/carImage';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { CarDetail } from 'src/app/models/carDetail';
import { CartService } from 'src/app/services/cart.service';
import { CreditCardService } from 'src/app/services/creditCard.service';
import { CarDetailService } from 'src/app/services/carDetail.service';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

cars: Car[] = [];
currentCar:Car;
filterText="";
brandFilter="";
carId: number;
carDetails: CarDetail[]=[];
carImages:CarImage[]=[];
imageURL: string = "https://localhost:44303"
brands:Brand[]=[];
colors:Color[]=[];
   constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,private carImagesService : CarImageService,
     private brandService:BrandService,private colorService:ColorService,private cartService:CartService,
     private creditCardService:CreditCardService,private carDetailService:CarDetailService
     ) { } 

  ngOnInit(): void {
  
   this.activatedRoute.params.subscribe(params=>{
    if (params["brandId"]) {
      this.getCarsByBrand(params["brandId"]);
    }
    //else if(params["colorId"]){
      //this.getCarsByColor(params["colorId"]);
    //}
    
    else if (params["carId"]){
      this.getImagesByCarId(params["carId"])}
     else {
      this.Details();
     }
    
  })
  }
  getCars() {
   this.carService.getCars().subscribe(response=>{
     this.cars=response.data
     ;
   })
  }

  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.carDetails=response.data
      console.log(response)
    })
   }
  SetCurrentCarDetail(car:Car){
      this.currentCar=car;

    }
  getCurrentBrandClass(car:Car) {
    if (car==this.currentCar){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  getAllBrandClass(){
    if (!this.currentCar){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
      
      
    })
  }
  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data
      
    })
   }
   getCarsDetails(carId:number){
    this.carService.getCarsDetails(carId).subscribe(response=>{
     
      
    })
  }
  Details() {
    this.carService.carsDetails().subscribe(response=>{
      this.carDetails=response.data
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
      
    })
  }
    
    getImagesByCarId(carId : number){
      this.carImagesService.getByCarId(carId).subscribe((response)=>{
        this.carImages = response.data;
        
      });
    }
    addToCart(car: CarDetail) {
      this.toastrService.success("Sepete eklendi.",car.carName)
      this.cartService.addToCart(car);
    }

  }
