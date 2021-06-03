import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-creditCard',
  templateUrl: './creditCard.component.html',
  styleUrls: ['./creditCard.component.css']
})
export class CreditCardComponent implements OnInit {
  addCreditCardForm:FormGroup;
  nameOnTheCard: string;
  cardNumber: string;
  cardCvv: string;
  expirationDate:string;
  payment: Payment;
  cardExist: Boolean = false;
  creditCardForm: FormGroup;
  selectedCard: Payment;
  constructor( private formBuilder : FormBuilder,
    private userService : UserService,
    private toastrService : ToastrService,
    private localStorageService : LocalStorageService) { }

  ngOnInit() {
  }
  createUserUpdateForm()
  {
    this.addCreditCardForm = this.formBuilder.group({
      customerId:[""],
      nameOnTheCard:["", Validators.required],
      cardNumber:["", Validators.required],
      expirationDate:["", Validators.required],
      cardCvv:["", Validators.required]
    });
  }
  addCreditCard()
  {
    let creditCardModel =  Object.assign({}, this.addCreditCardForm.value);
    creditCardModel.customerID = Number(this.localStorageService.getIdDecodeToken());
    this.userService.addCard(creditCardModel).subscribe((response) => {
      this.toastrService.success(response.message, "Success");
      window.location.reload();
    });

  }
  // async rent(){
  //   if(this.creditCardForm.valid){
  //     let payment:Payment = Object.assign({},this.creditCardForm.value)
  //     this.cardExist = await this.isCardExist(payment)
  //     if(this.cardExist){
  //       let newPayment = await((this.getFakeCardByCardNumber(this.cardNumber))) 
  //       let wannaSave = await this.isSaved(newPayment)
  //       if(!wannaSave){
  //         this.rentACar(newPayment)
  //       }
  //     }else{
  //       this.toastrService.error("Hesap bilgileriniz onaylanmadı","Hata")
  //     }
  //   }else{
  //     this.toastrService.error("Formu doldurmanız gerekli","Hata")
  //   }
    
  // }
}
