import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewAdminComponent } from "./Components/Admin/AdminControl/view-admin/view-admin.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ViewAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MMT_Clone_FrontEnd';
}
