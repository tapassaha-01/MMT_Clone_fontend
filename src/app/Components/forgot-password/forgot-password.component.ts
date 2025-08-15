import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, NgModel, FormsModule } from '@angular/forms';
import { IUser } from '../../Interface/IUser';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule] // Add any necessary imports for Angular Material or other libraries here
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  submitted = false;

  // OTP FORM AND VARIABLES
  otpForm!: FormGroup;
  showOtpForm: boolean = false;
  isLoading = false; // Loading state for the screen
  showForgotPasswordForm = false;

  // Forgot Components Variables
  @Input() email: string = ''; // for taking the email input of the user
  @Output() close = new EventEmitter<void>(); // for parent component to handle close


  constructor(private fb: FormBuilder, private _service: UserService) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$')]], // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
      confirmPassword: ['', Validators.required]
    });

    this.otpForm = this.fb.group({
      otp1: new FormControl(''),
      otp2: new FormControl(''),
      otp3: new FormControl(''),
      otp4: new FormControl(''),
      otp5: new FormControl(''),
      otp6: new FormControl(''),
    });

  }

  // otp submit methods
    onConfirm(){
      this.isLoading = true;
      this._service.regularOTPGeneration(this.email).subscribe(
        (success)=>{          
          if(success){
            this.isLoading = false;
            alert("Otp has been sent");
            console.log("OTP : ",success);
            this.showOtpForm = true;
            this.showForgotPasswordForm = false;
          }
        },
        (error)=>{
          this.isLoading = false; // Set loading state to true
          alert("Some error occured" + error);
          this.ngOnInit();
        }
      );
    }

  getOtpValue(): string {
    const otp = Object.values(this.otpForm.value).join('');
    this._service.verifyOTP(otp, this.email).subscribe(
      (success) => {
          alert('OTP verified successfully');
          this.showOtpForm = false;
          this.showForgotPasswordForm = true;
          console.log(success);
      },
      (error) => {
        alert('OTP verification failed');
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

  // Submitting new after otp confirmation password
  onSubmit(): void {
    this.submitted = true;
    const email = this.forgotPasswordForm.value.email;

    // TODO: Implement API call here to send password reset link


    // Optional: Show success message, then close modal
    alert(`Password Updated`);
    this.closePopup();
  }

  closePopup(): void {
    this.close.emit(); // trigger parent to hide popup
  }



  // EYE TOGGLE FUNCTIONALITY
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
