import { Component, OnInit } from '@angular/core';
import { IUser } from '../../Interface/IUser';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { CustomerbarComponent } from "../customerbar/customerbar.component";

@Component({
  selector: 'app-profile',
  imports: [CommonModule, CustomerbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  userProfile!: IUser;
  userEmail: string="";
  profilePic: string="";

  constructor(private _service: UserService){

    // this.userEmail = <string>sessionStorage.getItem('email');
    // this.OnGetUserDetails();
    
    this.userProfile = {
      email: "debjyoti@gmail.com",
      userName: "Debjyoti",
      phoneNo: 9732021932,
      password: "Debu@1800",
      admin:false
    }
  

  }

  ngOnInit(): void {
    this.profilePic = "assets/ProfileAvatars/pic1.jpg";
  }

  
  // 03 Method in Service.ts
  OnGetUserDetails(){
    this._service.GetUserDetail(this.userEmail).subscribe(
      success=>{
        this.userProfile=success;
      },
      error=>{
        alert("Some error occured while fetching user details");
      }
    );
  }

}
