import { Component, OnInit } from '@angular/core';
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
dataLoaded=false;
imageURL:string="https://localhost:44303";
brands:Brand[]=[];
colors:Color[]=[];
   constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,private carImagesService : CarImageService,
     private brandService:BrandService,private colorService:ColorService,private cartService:CartService,
     private creditCardService:CreditCardService,
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
    this.getCarsDetails(params["carId"])}
    else if (params["carId"]){
      this.getImagesByCarId(params["carId"])}
     else {
      this.getCars();
     }
    
  })
  }
  getCars() {
   this.carService.getCars().subscribe(response=>{
     this.cars=response.data
     this.dataLoaded=true;
   })
  }

  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
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
      this.dataLoaded=true;
      
    })
  }
  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
   }
   getCarsDetails(carId:number){
    this.carService.getCarsDetails(carId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
      this.dataLoaded=true;
    })
  }
    
    getImagesByCarId(carId : number){
      this.carImagesService.getByCarId(carId).subscribe((response)=>{
        this.carImages = response.data;
        this.dataLoaded=true;
      });
    }
    addToCart(car: CarDetail) {
      this.toastrService.success("Sepete eklendi.",car.carName)
      this.cartService.addToCart(car);
    }

  }
