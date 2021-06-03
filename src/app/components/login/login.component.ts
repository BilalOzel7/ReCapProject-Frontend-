import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private toastrService: ToastrService) { }
  loginForm:FormGroup;
  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm=this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required],
    })
  }

  login() {
    if(this.loginForm.valid)
    console.log(this.loginForm.value);
    let loginModel=Object.assign({},this.loginForm.value)

    this.authService.login(loginModel).toPromise().then(response=>{
      this.toastrService.info(response.message)
      localStorage.setItem("token",response.data.token)
    }).catch(responseError=>{
      console.log({error: responseError.error});
      this.toastrService.error(responseError.error)
    })
  }
}

// this.carService.add(carModel).toPromise().then(response => {
//   this.toastrService.success(response.message, 'Başarılı');
// }).catch(response => {
//   console.log({error: response.error});
//   if (response.error.Errors.length > 0) 
//     for (
//       let index = 0;
//       index < response.error.Errors.length;
//       index++
//     ) {
//       this.toastrService.error(
//         response.error.Errors[index].ErrorMessage,
//         'Doğrulama Hatası'
//       );
//     }
//   });
// }

// }