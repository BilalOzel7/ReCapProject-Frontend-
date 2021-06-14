import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
@Input() brands:Brand[] =[]
currentBrand:Brand;
carDetails: CarDetail[]=[];
filterBrandText="";
  constructor(private brandService:BrandService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
 
    this.getBrands();
    
  }
  getBrands() {
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
   }

   setCurrentBrand(brands: Brand) {
     this.currentBrand=brands;
   }

   getCurrentBrandClass(brands: Brand) {
     if (brands==this.currentBrand){
       return "list-group-item active"
     }else {
      return "list-group-item"
     }
   }

   getAllBrandClass() {
     if(!this.currentBrand){
       return "list-group-item active"
     }else {
       return "list-group-item"
     }
   }
   Details() {
    this.brandService.carsDetails().subscribe(response=>{
      this.carDetails=response.data
    })
  }
   
}
