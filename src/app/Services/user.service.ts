import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { IUser } from '../Interface/IUser';
import { UserEntity } from '../Interface/UserEntity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  // 01 - METHOD TO LOGIN USER
  UserLogin(email: string, password: string): Observable<boolean>{
    return this.http.get<boolean>('').pipe(catchError(this.errorHandler));
  }


  // 02 - METHOD FOR USER SIGN UP/REGISTRATION
  UserSignup(form: FormGroup): Observable<boolean>{
    var tempObj: IUser={
      userName: form.value.userName,
      dateOfBirth: form.value.dobName,
      email: form.value.emailName,
      phoneNumber: form.value.numberName,
      password: form.value.passwordName
    } ;
    return this.http.post<boolean>('http://localhost:9090/MMT/register', tempObj).pipe(catchError(this.errorHandler));
  }

  generateOtp():Observable<string>{
var tempObj: UserEntity={
  userName:"Debu",
  email: "rdebjytoti@gmail.com",
  phoneNo: 12345234534,
  password: "admin12",
  admin: false
};
  return this.http.post<string>('http://localhost:9090/MMT/generateOtp', tempObj).pipe(catchError(this.errorHandler));
  }

  // 03 - AFTER LOGIN=> METHOD TO SHOW USER PROFILE BASED ON USER-EMAIL
  GetUserDetail(email: string): Observable<IUser>{
    return this.http.get<IUser>(''+email).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
