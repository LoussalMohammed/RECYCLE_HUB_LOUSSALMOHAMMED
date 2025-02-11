import { Component } from '@angular/core';
import { UserNavbarComponent } from "../../../../shared/ui/user-navbar/user-navbar.component";
import { PendingCollectionRequestListComponent } from "../pending-collection-request-list/pending-collection-request-list.component";

@Component({
  selector: 'app-dashboard',
  imports: [PendingCollectionRequestListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
