import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, of, throwError } from 'rxjs';
import { IUser } from '../Interface/IUser';
import { ITravelDetails } from '../Interface/ITravelDetails';
import { IFlightDetails } from '../Interface/IFlightDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
 

  baseUrl:string = "http://localhost:9090/MMT/"
  bookingUrl:string = "http://localhost:9090/MMT/Booking/"
  otpUrl:string = "http://localhost:9090/otp/"
  adminUrl:string = "http://localhost:9090/MMT/Admin/"

  constructor(private http: HttpClient) { }




  // 01 - METHOD TO LOGIN USER
  UserLogin(userName: string, password: string): Observable<Map<string,string> >{
    const params = new HttpParams()
      .set('userName', userName)
      .set('password', password);
  
    return this.http.post<Map<string,string>>(this.baseUrl + 'login', params, { responseType: 'json' as 'json' }).pipe(
      catchError(this.errorHandler)
    );
  }
    
  // 02 - METHOD TO REGISTER USER and send otp to email
  generateOtp(form: FormGroup<any>) :Observable<string>{
    var tempObj: IUser={
            userName: form.value.userName,
            email: form.value.emailName,
           phoneNo: form.value.numberName,
           password: form.value.passwordName,
           admin: false
         } ;
         return this.http.post<string>(this.baseUrl + 'generateOtp', tempObj).pipe(catchError(this.errorHandler));
  }

  // 03 - METHOD TO VERIFY OTP and register user
  verifyOTP(otp: string, email: string): Observable<string>{
    const otpObj = {
      emailId: email,
      otp: otp
    };
    console.log(otpObj);
    return this.http.post<any>(this.otpUrl+"otpVerify", otpObj).pipe(catchError(this.errorHandler));

  }

  // 04 - AFTER LOGIN=> METHOD TO SHOW USER PROFILE BASED ON USER-EMAIL
  GetUserDetail(email: string): Observable<IUser>{
    return this.http.get<IUser>(''+email).pipe(catchError(this.errorHandler));
  }

  // 05 - Booking flight
  bookFlight(allDetailsObj: ITravelDetails):Observable<Map<string,string> >{
    return this.http.post<Map<string, string>>(this.bookingUrl+"bookTicket", allDetailsObj).pipe(catchError(this.errorHandler));
  }
  
  // 06 - payment otp
  generatePaymentOtp(email: string): Observable<string> {
    const params = new HttpParams()
      .set('emailId', email)
     return this.http.post<string>(this.otpUrl+"otpGenerate", params, { responseType: 'json' as 'json' }).pipe(catchError(this.errorHandler));
  }

  // 07 - Update user profile
  UpdateUserDetail(form: FormGroup): Observable<IUser> {
    return this.http.put<IUser>(this.baseUrl + 'update', form).pipe(catchError(this.errorHandler));
  }


  // 08 - Fecth all flight details
  GetFlightDetails(flightDetails: IFlightDetails): Observable<IFlightDetails[]> {
    return this.http.post<IFlightDetails[]>(this.adminUrl + 'getFlightDetails', flightDetails).pipe(catchError(this.errorHandler));
  }

 // 09 - FetchAllCities
 FetchAllCities(): Observable<string[]> {
  return this.http.get<string[]>('getAllFlights').pipe(catchError(this.errorHandler));
 }



  // ERROR HANDLER METHOD
  // This method is used to handle errors from the server and return a user-friendly message.
  errorHandler(error: HttpErrorResponse){
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
