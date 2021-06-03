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
@Input() brand:Brand[] =[]
currentBrand:CarDetail;
carDetails: CarDetail[]=[];
  constructor(private brandService:BrandService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
     this.Details();
    this.getBrands();
  }
  getBrands() {
    this.brandService.getBrands().subscribe(response=>{
      this.brand=response.data;
    })
   }

   setCurrentBrand(brand: CarDetail) {
     this.currentBrand=brand;
   }

   getCurrentBrandClass(brand: CarDetail) {
     if (brand==this.currentBrand){
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
