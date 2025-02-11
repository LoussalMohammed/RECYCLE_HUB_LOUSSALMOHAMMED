import { Component } from '@angular/core';
import { UserNavbarComponent } from "../../../../shared/ui/user-navbar/user-navbar.component";
import { CollectionRequestListComponent } from "../collection-request-list/collection-request-list.component";

@Component({
  selector: 'app-request-page',
  imports: [CollectionRequestListComponent],
  templateUrl: './request-page.component.html',
  styleUrl: './request-page.component.css'
})
export class RequestPageComponent {

}
