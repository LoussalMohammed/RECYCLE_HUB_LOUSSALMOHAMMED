import { Component } from '@angular/core';
import { UserNavbarComponent } from "../../../../shared/ui/user-navbar/user-navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports: [UserNavbarComponent , RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
