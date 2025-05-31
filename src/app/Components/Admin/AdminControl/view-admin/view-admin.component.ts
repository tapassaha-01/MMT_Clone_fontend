import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ViewUserComponent } from "../view-user/view-user.component";
import { ViewDashboardComponent } from "../view-dashboard/view-dashboard.component";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-view-admin',
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    ViewUserComponent,
    ViewDashboardComponent,
    RouterLink
],
  templateUrl: './view-admin.component.html',
  styleUrl: './view-admin.component.css'
})
export class ViewAdminComponent {

    selectedSection: string = 'dashboard';

  selectSection(section: string) {
    this.selectedSection = section;
  }
 
  

  logout() {
    // Implement logout logic here
    console.log('Logout clicked');
  }
}
