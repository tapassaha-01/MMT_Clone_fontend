import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { isPlatformBrowser } from '@angular/common';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-view-dashboard',
  imports: [ CommonModule, NgChartsModule],
  templateUrl: './view-dashboard.component.html',
  styleUrl: './view-dashboard.component.css'
})
export class ViewDashboardComponent {

    isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Sample Chart Configs
  bookingTrends: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        { label: 'Bookings', 
          data: [12, 19, 3, 5, 2, 3, 9], 
          borderColor: '#4e73df', 
          fill: true,
          backgroundColor: 'rgba(78,115,223,0.2)',
          pointBackgroundColor: 'white',
          pointBorderColor: 'white'}
      ]
    }
  };

  userGrowth: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        { label: 'Users', data: [100, 200, 300, 400, 600], borderColor: '#1cc88a', fill: true, backgroundColor: 'rgba(28,200,138,0.2)' }
      ]
    }
  };

  revenueComparison: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: ['This Month', 'Last Month'],
      datasets: [
        { label: 'Revenue', data: [5000, 3000], backgroundColor: ['#36b9cc', '#f6c23e'] }
      ]
    }
  };

  categoryDistribution: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: {
      labels: ['Flights', 'Hotels', 'Cars'],
      datasets: [{
        label: 'Categories',
        data: [45, 25, 30],
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc']
      }]
    }
  };
}
