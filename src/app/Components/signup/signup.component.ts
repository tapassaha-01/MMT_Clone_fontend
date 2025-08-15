import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonbarComponent } from "../commonbar/commonbar.component";
import { RouterLink } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { IUser } from '../../Interface/IUser';


@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, CommonbarComponent, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  emailRegx="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  numberRegx= "^[0-9]{10}$"
  signupForm!: FormGroup;
  otpForm!: FormGroup;
  showOtpForm: boolean = false;
  isLoading = false; // Loading state for the screen

  constructor(private formBuilder: FormBuilder, private _service: UserService, private router: Router){}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      
      emailName: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      phoneNo: ['', [Validators.required, Validators.pattern(this.numberRegx)]],
      passwordName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required]
    }, { validators: checkPassword() });
    
    this.otpForm = this.formBuilder.group({
      otp1: new FormControl(''),
      otp2: new FormControl(''),
      otp3: new FormControl(''),
      otp4: new FormControl(''),
      otp5: new FormControl(''),
      otp6: new FormControl(''),
    });
  }

  OnSubmitForm(form: FormGroup){
    this.isLoading = true; // Set loading state to true
        var tempObj: IUser={
           userName: form.value.userName,
           email: form.value.emailName,
           phoneNo: form.value.numberName,
           password: form.value.passwordName,
           admin: false
         };
    this._service.generateOtp(tempObj).subscribe(
      success=>{
        if(success){
          this.isLoading = false; // Set loading state to true
          alert("Otp has been send");
          console.log("OTP : ",success);
          this.showOtpForm = true;
          // this.router.navigate(['/login']);
        }
      },
      error=>{
        this.isLoading = false; // Set loading state to true
        alert("Some error occured");
        this.ngOnInit();
      }
    )
  }
getOtpValue(): string {
  const otp = Object.values(this.otpForm.value).join('');
  this._service.verifyOTP(otp,this.signupForm.value.emailName).subscribe(
    success => {
      // if (success.length>0) {
        alert('OTP verified successfully');
        console.log( success);
        this.router.navigate(['/login']);
      // }
    },
    error => {
      alert('OTP verification failed');
      this.router.navigate(['/signup']);
      console.error('OTP verification error:', error);
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




// CUSTOM VALIDATIONS

export function checkPassword(): ValidatorFn{

return (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('passwordName');
  const confirmPassword = group.get('confirmPassword');

  if(password && confirmPassword && password.value !== confirmPassword.value){
      return {passwordMismatch: true};
    }
  
    return null;
  }
}

function checkDOB(control: FormControl): ValidationErrors | null {
  const currentDate = new Date();
  const givenDate = new Date(control.value);
  const diffDays = (currentDate.getTime() - givenDate.getTime()) / (1000 * 60 * 60 * 24);

  if (!control.value || isNaN(givenDate.getTime())) {
    return { dateError: { message: "Invalid date format" } };
  }

  if (diffDays < (15 * 365)) {
    return {
      dateError: {
        message: "You must be at least 15 years old."
      }
    };
  }

  return null; // valid
}
