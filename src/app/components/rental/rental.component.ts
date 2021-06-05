import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers: [DatePipe],
})
export class RentalComponent implements OnInit {
rentals:Rental[]=[];
customers:Customer[];
  customerId:number;
  rental:Rental;
  rentDate: Date;
  returnDate : Date;
  @Input() car : Car;
  rentalDetails:RentalDto[]=[]
  
  
  minDate: string | any;
  maxDate: string | null;
  maxMinDate: string | null;
  firstDateSelected: boolean = false;
  constructor(private rentalService:RentalService,private customerService: CustomerService,
    private router: Router,private toastrService: ToastrService,
    private authService : AuthService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getCustomer();
    this.getRentals();
    this.RentalDetails();
  }
getRentals() {
  this.rentalService.getRentals().subscribe(response=>{
    this.rentals=response.data
})
}
RentalDetails() {
  this.rentalService.getAllRentalDetail().subscribe(response=>{
    this.rentalDetails=response.data
  })
}

getCustomer() {
  this.customerService.getCustomers().subscribe((response) => {
    this.customers = response.data;
    console.log(response.data);
  });
}
}

