import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer, CustomerDetail } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CreditCardComponent } from '../../creditCard/creditCard.component';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {
rentals:Rental
dailyPrice:number
rentalAddForm:FormGroup;
rentDate = new Date
returnDate=new Date
totalPrice: number = 0
customers: CustomerDetail[] = []
customerId:number;
currentCar: CarDetail
carId:number

rentable:Boolean = false;
currentDate: Date = new Date()
  constructor(private activatedRoute: ActivatedRoute,private rentalService:RentalService ,
    private formBuilder: FormBuilder,private customerService: CustomerService,
    private toastrService:ToastrService,private router:Router
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {if(params['carId']){ this.carId = Number(params['carId']);
    if(params['dailyPrice']){this.dailyPrice=Number(params['dailyPrice']);}
    }});
    this.createRentalAddForm();
    
    this.getCustomers();
    //   this.minDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
    // this.maxDate=this.datePipe.transform(new Date(new Date().setFullYear(new Date().getFullYear() + 1)),"yyyy-MM-dd");
      

  }
addRentals(rent:Rental){
  this.rentalService.addRentals(rent)
}
createRentalAddForm() {
  this.rentalAddForm=this.formBuilder.group({
    customerId:['', Validators.required],
    carId:[this.carId],
    rentDate:['', Validators.required],
    returnDate:['', Validators.required],
  }) 
  
}

getCustomers() {
  this.customerService.getCustomers().subscribe((response) => {
    this.customers = response.data
    
  });
}
add() {
  if(this.rentalAddForm.valid){

    let rentalModel = Object.assign({}, this.rentalAddForm.value);
    console.log("carId",this.rentalAddForm.value.carId)
    rentalModel.carId = this.carId
    rentalModel.dailyPrice=this.dailyPrice

    this.checkDate(rentalModel)
    // this.calculatePayment(rentalModel)
    this.router.navigate(['/payment',JSON.stringify(rentalModel)]);
    this.toastrService.info('Ödeme sayfasına yönlendiriliyorsunuz.','Ödeme İşlemleri')
  }
  else{
  this.toastrService.error("Dikkat","Kiralanamadı, Formunuz Eksik")
  }
}
calculatePayment(rental:Rental){
  if(rental.returnDate != null){
    var returnDate = new Date(rental.returnDate.toString());
    var rentDate = new Date(rental.rentDate.toString());
    var difference = returnDate.getTime() - rentDate.getTime();

    var rentDays = Math.ceil(difference / (1000 * 3600 * 24));
    
    rental.totalRentPrice = rentDays * this.dailyPrice;

    
    if(rental.totalRentPrice <= 0){
      this.router.navigate(['/cars']);
      this.toastrService.error('Ana sayfaya yönlendiriliyorsunuz','Hatalı işlem');
    }
  }
}
checkDate(rentalModel:Rental){
  let rentDate = new Date(rentalModel.rentDate);
    let returnDate = new Date(rentalModel.returnDate);
    if (rentDate < this.currentDate) {
      this.toastrService.warning(
         'Kiralama Tarihi, bu günden sonraki günler olmalıdır', 'Dikkat'
      );
      
   }
   if (returnDate < rentDate || returnDate.getDate() == rentDate.getDate()) {
      this.toastrService.warning(
         'Dönüş Tarihi, kiralama tarihinden sonraki günler olmalıdır', 'Dikkat'
      );
      
   }
  }}
