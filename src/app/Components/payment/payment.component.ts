import { Component, OnInit } from '@angular/core';
import { CustomerbarComponent } from "../customerbar/customerbar.component";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [CustomerbarComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{

  payerName: string='';
  payerEmail: string='';
  paymentAmount = 0;
  showOtpForm=false;
  isLoading = false; // Loading state for the screen
  otpForm!: FormGroup;
  paymentForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private _service: UserService, private router: Router) {
    var userObj = localStorage.getItem('user');
    if(userObj != null){
      var user = JSON.parse(userObj);
      this.payerName = user.userName;
      this.payerEmail = user.email;
    }
  }

  ngOnInit(): void {
      this.paymentForm=this.formBuilder.group({
        payerName: [this.payerName],
        paymentMethod: [''],
        paymentAmount: [this.paymentAmount],
        upinumber:['', [Validators.required]],
        expThrough: ['', [Validators.required]],
        cvvNumber: ['', [Validators.required]]
      });

      this.otpForm = this.formBuilder.group({
        otp1: new FormControl(''),
        otp2: new FormControl(''),
        otp3: new FormControl(''),
        otp4: new FormControl(''),
        otp5: new FormControl(''),
        otp6: new FormControl(''),
      });
  }

  // Method to confirm payment
  OnPayment(_form: FormGroup){
    this.isLoading = true; // Set loading state to true
    this._service.regularOTPGeneration(this.payerEmail).subscribe(
      success=>{
        if(success){
          this.isLoading = false; // Set loading state to true
          alert("Otp sent");
          console.log("OTP : ",success)
          this.showOtpForm = true;
        }
      },
      error=>{
        this.isLoading = false; // Set loading state to true
        alert("Some error occured");
        this.ngOnInit();
      }
    )
  }


  getOtpVarified(): string {
    const otp = Object.values(this.otpForm.value).join('');
    this._service.verifyOTP(otp,this.payerEmail).subscribe(
      success => {
        if (success) {
          alert('OTP verified: Payment done successfully');
          console.log('OTP verification success:', success);
          this.router.navigate(['/reviewBooking']);
        }
      },
      error => {
        alert('OTP verification failed');
        console.error('OTP verification error:', error);
        this.router.navigate(['/bookFlight']);
      }
    );
    console.log('OTP is:', otp);
    return otp;
  }
  
  move(event: any, nextInput: any) {
    if (event.target.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }
}
