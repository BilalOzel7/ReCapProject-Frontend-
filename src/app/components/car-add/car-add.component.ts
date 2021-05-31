import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
carAddForm: FormGroup;
  constructor(private formBuilder:FormBuilder, private carService:CarService, private toastrService:ToastrService) { }

  ngOnInit() {
    this.createCarAddForm();
  }

createCarAddForm() {
      this.carAddForm=this.formBuilder.group({
        carName:['',Validators.required],
        description : ['',Validators.required],
        dailyPrice : ['',Validators.required],
        brandId:['',Validators.required],
        colorId:['',Validators.required],
        modelYear:['',Validators.required]
      })
    }

    add(){
      if(this.carAddForm.valid){
         let carModel=Object.assign({},this.carAddForm.value)
         this.carService.add(carModel).subscribe(response=>{
          this.toastrService.success(response.message,"Başarılı")
         },responseError=>{ console.log("çalıştı"+responseError.error)
           if(responseError.error.Errors.length>0){ console.log("if çalıştı")
           for (let index = 0; index < responseError.error.Errors.length; index++) {
             this.toastrService.error(responseError.error.Errors[index].ErrorMessage,"Doğrulama Hatası")
           }
          }
         })
      }else {
        this.toastrService.error("Formunuz eksik","Dikkat")
      }
    
    }
}
