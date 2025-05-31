import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customerbar',
  imports: [RouterLink],
  templateUrl: './customerbar.component.html',
  styleUrl: './customerbar.component.css'
})
export class CustomerbarComponent implements OnInit{
  title="Demo Travel App";
  userName: string='';

  @Input() adminBool: boolean = false;

  constructor(private router: Router){}

  ngOnInit(): void {
      var user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userName = user.userName || ''; 
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
