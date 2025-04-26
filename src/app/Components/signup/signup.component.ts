import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonbarComponent } from "../commonbar/commonbar.component";
import { RouterLink } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';


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

  constructor(private formBuilder: FormBuilder, private _service: UserService, private router: Router){}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      dobName: ['', [Validators.required, checkDOB]],
      emailName: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      numberName: ['', [Validators.required, Validators.pattern(this.numberRegx)]],
      passwordName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required]
    }, { validators: checkPassword() });
    
  }

  OnSubmitForm(form: FormGroup){
    this._service.UserSignup(form).subscribe(
      success=>{
        if(success){
          alert("User signup successful");
          this.router.navigate(['/login']);
        }
      },
      error=>{
        alert("Some error occured");
        this.ngOnInit();
      }
    )
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
