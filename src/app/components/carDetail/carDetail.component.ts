import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/carDetail.service';

@Component({
  selector: 'app-carDetail',
  templateUrl: './carDetail.component.html',
  styleUrls: ['./carDetail.component.css']
})
export class CarDetailComponent implements OnInit {
carDetails:CarDetail[] = [];
  constructor(private carDetailService: CarDetailService) { }

  ngOnInit() {
    this.getCarDetails();
  }
getCarDetails(){
  this.carDetailService.getCarDetails().subscribe(response =>{
    this.carDetails=response.data;
  })
}
}
