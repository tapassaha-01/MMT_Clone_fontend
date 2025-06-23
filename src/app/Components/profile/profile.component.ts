import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../Interface/IUser';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { CustomerbarComponent } from "../customerbar/customerbar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, CustomerbarComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  userProfile!: IUser;
  userEmail: string="";
  profilePic: string="";
  passwordEnch: string = '';

  profileUpdate: boolean = false;
  profilePicUpdate: boolean = false;
  selectedFile: File | null = null;

  profilePicList: string[] = [
    "/assets/ProfileAvatars/pic1.jpg",
    "/assets/ProfileAvatars/pic2.jpg",
    "/assets/ProfileAvatars/pic3.jpg",
    "/assets/ProfileAvatars/pic4.jpg",
    "/assets/ProfileAvatars/pic5.jpg",
    "/assets/ProfileAvatars/pic6.jpeg",
    "/assets/ProfileAvatars/pic7.jpeg",
    "/assets/ProfileAvatars/pic8.jpeg",
    "/assets/ProfileAvatars/pic9.jpeg",
    "/assets/ProfileAvatars/pic10.jpeg",
    "/assets/ProfileAvatars/pic11.jpeg",
    "/assets/ProfileAvatars/pic12.jpeg"
  ];

  profileUpdateForm!: FormGroup;

  constructor(private _service: UserService, private fb: FormBuilder) {

    // this.userEmail = <string>sessionStorage.getItem('email');
    // this.OnGetUserDetails();
    
    this.userProfile = {
      email: "debjyoti@gmail.com",
      userName: "Debjyoti",
      phoneNo: 9732021932,
      password: "Debu@1800",
      admin:false
    }
  
    this.profileUpdateForm = this.fb.group({
      username: [this.userProfile.userName, [Validators.required]],
      email: [this.userProfile.email, [Validators.required, Validators.email]],
      contactNumber: [this.userProfile.phoneNo, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: [this.userProfile.password, [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.passwordEnch = 'x'.repeat(this.userProfile.password.length);
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

  // These two are for updating the profile
  updateProfileVariable(){
    this.profileUpdate = true;
  }
  cancelProfileUpdate(){
    this.profileUpdate = false;
  }

  // 07 method in Service.ts
  UpdateProfile(form: FormGroup){
    this._service.UpdateUserDetail(form).subscribe(
      success=>{
        this.userProfile=success;
        alert("Profile updated successfully");
      },
      error=>{
        alert("Some error occured while updating user details");
        this.ngOnInit();
      }
    );
  }


  // THESE TWO ARE FOR UPDATING THE PROFILE PIC
  // Update profile pic
  UpdateProfilePic(){
    this.profilePicUpdate = !this.profilePicUpdate;
  }

  // Set profile pic // ******************************************************* HAVE TO UPDATE THIS METHOD SO THAT IT CAN UPDATE BOTH AVATAR PICS AND UPLOADED PICS 
  SetProfilePic(pic: string){
    this.profilePic = pic;
    this.profilePicUpdate = false;
  }

  // This method and the method just above needs to be meerged into one method that can handle 
  // both avatar selection [which is currently in string] and file upload [which is in file format]
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.profilePicUpdate = false; // close the profile pic update modal
      this.profilePic = URL.createObjectURL(this.selectedFile); // preview if needed
    }
  }



}
