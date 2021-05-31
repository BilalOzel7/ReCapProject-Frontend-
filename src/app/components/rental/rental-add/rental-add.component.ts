import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {
rentals:Rental
  constructor(private activatedRoute: ActivatedRoute,private rentalService:RentalService) { }

  ngOnInit() {
  }
addRentals(rent:Rental){
  this.rentalService.addRentals(rent)
    
  
}
}
