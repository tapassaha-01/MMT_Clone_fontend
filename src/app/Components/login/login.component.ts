import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm } from '@angular/forms';
import { CommonbarComponent } from "../commonbar/commonbar.component";
import { UserService } from '../../Services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonbarComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  errorMsg: string="";

  constructor(private _service: UserService, private _router: Router){}

  ngOnInit(): void {
      
  }

  onUserLogin(_form: NgForm){
    
    localStorage.setItem('email', _form.value.emailName);
    alert("login success")
    this._router.navigate(['/homeview']);
    
    // this._service.UserLogin(_form.value.emailName, _form.value.passwordName).subscribe(
    //   success=>{
    //     if(success){
    //       sessionStorage.setItem('email', _form.value.emailName);

    //       alert("Login Successful");
    //       this._router.navigate(['/homeview']);
    //     }
    //   },
    //   error=>{
    //     this.errorMsg=error;
    //     alert("Some error occured");
    //   },
    //   ()=>{
    //     console.log("User login Successful")
    //   }
    // );
  }
}
