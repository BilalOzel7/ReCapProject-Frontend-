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
car:CarDetail
rentalAddForm:FormGroup;
rentDate = new Date
returnDate=new Date
totalPrice: number = 0
customers: CustomerDetail[] = []
customerId:number;
currentCar: CarDetail

rentable:Boolean = false;
currentDate: Date = new Date()
  constructor(private activatedRoute: ActivatedRoute,private rentalService:RentalService ,
    private formBuilder: FormBuilder,private customerService: CustomerService,
    private toastrService:ToastrService,private router:Router
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {if(params['car']){ this.car = JSON.parse(params['car']);}});
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
    // carId:[this.car.carId, Validators.required],
    rentDate:['', Validators.required],
    returnDate:['', Validators.required],
  }) 
  console.log(this.car)
}

getCustomers() {
  this.customerService.getCustomers().subscribe((response) => {
    this.customers = response.data
    
  });
}
add() {
  if(this.rentalAddForm.valid){

    let rentalModel = Object.assign({}, this.rentalAddForm.value);
    this.checkDate(rentalModel)
    this.calculatePayment(rentalModel)
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
    
    rental.totalRentPrice = rentDays * this.car.dailyPrice;

    
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
// calculatePrice():number{
//   if(this.startDate && this.endDate){
//     let endDate = new Date(this.endDate.toString())
//     let startDate = new Date(this.startDate.toString())
//     let endDay = Number.parseInt(endDate.getDate().toString())
//     let endMonth = Number.parseInt(endDate.getMonth().toString())
//     let endYear = Number.parseInt(endDate.getFullYear().toString())
//     let startDay = Number.parseInt(startDate.getDate().toString())
//     let startMonth = Number.parseInt(startDate.getMonth().toString())
//     let startYear = Number.parseInt(startDate.getFullYear().toString())
//     let result =  ((endDay - startDay) + ((endMonth - startMonth)*30) + ((endYear - startYear)*365) + 1) * this.car.dailyPrice
//     if (result>0){
//       return result
//     }
//   }
//   this.toastrService.info("Bu tarihler arasında arabayı kiralayamazsınız","!")
//   return 0
// }
// controlEndDate(){
//   if(this.endDate<this.startDate){
//     this.endDate = this.startDate
//   }
// }
// async addRental(){
//   this.rentable = (await this.setRentable())
//   if(this.rentable){
//     let currentUserId = this.authService.getCurrentUserId()
//       this.rentals = this.rentals;
//       this.rentals.customerId = this.authService.getCurrentUserId()
//       this.openCreditCard()
//     }
// }
// openCreditCard(){
  
//   const ref = this.dialogService.open(CreditCardComponent, {
//     data:{
//       rental: this.rentals
//     },
//     header: 'Kart bilgileri',
//     width: '40%'
//   });
// }

// async setRentable(){
//   this.rentals = {
//     carId:this.car.carId,
//     rentalId:this.rentals.rentalId,
//     customerId:this.customerId,
//     rentDate:this.startDate,
//     returnDate:this.endDate,
//     totalRentPrice:this.calculatePrice()
//   };
//   return (await this.rentalService.isRentable(this.rentals).toPromise()).success
// }

  }}
