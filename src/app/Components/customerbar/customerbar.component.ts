import { NgIf } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdsComponent } from "../ads/ads.component";
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-customerbar',
  imports: [RouterLink, NgIf, AdsComponent],
  templateUrl: './customerbar.component.html',
  styleUrl: './customerbar.component.css'
})
export class CustomerbarComponent implements OnInit{
  title="Demo Travel App";
  userName: string='';

  adminBool!: boolean;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userName = user.userName || ''; 
      this.adminBool = user.admin; // Assuming user object has isAdmin property
    }
  }

  OnLogout(): void {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      // Perform your logout logic here (e.g., clearing tokens, calling logout API)
      localStorage.clear();

      // Then redirect to home
      this.router.navigate(['/home']);
    } else {
      // Optional: Do something if the user cancels
      console.log('Logout cancelled');
    }
  }
}
