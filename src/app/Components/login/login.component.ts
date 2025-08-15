import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm } from '@angular/forms';
import { CommonbarComponent } from "../commonbar/commonbar.component";
import { UserService } from '../../Services/user.service';
import { Router, RouterLink } from '@angular/router';
import { error } from 'node:console';
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonbarComponent, RouterLink, ForgotPasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  errorMsg: string="";
  showForgotPassword: boolean = false;

  constructor(private _service: UserService, private _router: Router){}

  ngOnInit(): void {
      
  }

  onUserLogin(_form: NgForm){
 
    this._service.UserLogin(_form.value.UserName, _form.value.passwordName).subscribe(
      success=>{
        if(success){
          const successMap = new Map<string, string>(Object.entries(success));
          sessionStorage.setItem("jwtToken", successMap.get('jwtToken') || '');
          sessionStorage.setItem("user", successMap.get('user') || '');
          this._router.navigate(['/homeview']);
        }
        else{
          alert("Please enter valid credentials");
          this._router.navigate(['/login']);
        }
      },
      error=>{
        this.errorMsg=error;
        alert("please enter valid credentials");
        this._router.navigate(['/login']);
      },
      ()=>{
        console.log("User login Successful")
      }
    );
  }




  // Update password method
  updatePassword(){
    this.showForgotPassword = true;
  }
  onForgotPasswordClose() {
    this.showForgotPassword = false;
  }

}
