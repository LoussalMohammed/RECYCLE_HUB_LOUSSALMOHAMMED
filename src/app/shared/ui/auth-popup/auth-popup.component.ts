import { Component, inject } from '@angular/core';
import { RegisrationFormComponent } from "../../../modules/auth/regisration-form/regisration-form.component";
import { LoginFormComponent } from "../../../modules/auth/login-form/login-form.component";
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectActiveAuthForm} from '../../../modules/home/state/home.selectors';
import { AsyncPipe } from '@angular/common';
import * as homeActions from "../../../modules/home/state/home.actions"

@Component({
  selector: 'app-auth-popup',
  imports: [RegisrationFormComponent, LoginFormComponent , AsyncPipe],
  templateUrl: './auth-popup.component.html',
  styleUrl: './auth-popup.component.css'
})
export class AuthPopupComponent {
  activeAuthForm$ !: Observable<string>;
  private store = inject(Store);

  ngOnInit(): void {
    this.activeAuthForm$ = this.store.pipe(select(selectActiveAuthForm));
  }

  handleSwitchingForms() : void{
    this.store.dispatch(homeActions.toggleAuthForm());
  }

  closePopup() : void {
    this.store.dispatch(homeActions.hideAuthPopup());
  }

}
