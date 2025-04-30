import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { IUser } from '../Interface/IUser';
import { UserEntity } from '../Interface/UserEntity';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  baseUrl:string = "http://localhost:9090/MMT/"

  constructor(private http: HttpClient) { }




  // 01 - METHOD TO LOGIN USER
  UserLogin(email: string, password: string): Observable<Map<string,string> >{
    const params = new HttpParams()
      .set('userName', email)
      .set('password', password);
  
    return this.http.post<Map<string,string>>(this.baseUrl + 'login', null, { params, responseType: 'json' }).pipe(
      catchError(this.errorHandler)
    );
  }
    
  


  // 02 - METHOD FOR USER SIGN UP/REGISTRATION
  UserSignup(form: FormGroup): Observable<string>{
    var tempObj: IUser={
      userName: form.value.userName,
      email: form.value.emailName,

     // phoneNumber: form.value.numberName,
     // password: form.value.passwordName
   // } ;
  //  return this.http.post<boolean>('http://localhost:9090/MMT/register', tempObj).pipe(catchError(this.errorHandler));
 // }

 // generateOtp():Observable<string>{
//var tempObj: UserEntity={
  //userName:"Debu",
  //email: "rdebjytoti@gmail.com",
  //phoneNo: 12345234534,
  //password: "admin12",
  //admin: false
//};
  //return this.http.post<string>('http://localhost:9090/MMT/generateOtp', tempObj).pipe(catchError(this.errorHandler));

      phoneNo: form.value.numberName,
      password: form.value.passwordName,
      admin:false
    };
    return this.http.post<string>(this.baseUrl+"generateOtp", tempObj).pipe(catchError(this.errorHandler));
  }

  verifyOTP(otp: string, email: string): Observable<any>{
    const otpObj = {
      emailId: email,
      otp: otp
    };
    console.log(otpObj);
    return this.http.post<any>(this.baseUrl+"register", otpObj).pipe(catchError(this.errorHandler));

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
