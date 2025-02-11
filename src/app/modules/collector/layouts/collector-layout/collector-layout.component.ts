import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserNavbarComponent } from '../../../../shared/ui/user-navbar/user-navbar.component';

@Component({
  selector: 'app-collector-layout',
  imports: [RouterOutlet , UserNavbarComponent],
  templateUrl: './collector-layout.component.html',
  styleUrl: './collector-layout.component.css'
})
export class CollectorLayoutComponent {

}
