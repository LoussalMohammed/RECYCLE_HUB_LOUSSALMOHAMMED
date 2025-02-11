import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectSignedInUser } from '../../modules/auth/state/auth.selectors';
import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.store.select(selectSignedInUser).pipe(
      map(user => {
        if (!user) {
          return this.router.createUrlTree(['/']);
        }

        const requiredRole = route.data['role'];
        if (user.role === requiredRole) {
          return true;
        }

        return this.router.createUrlTree([user.role === 'user' ? 'user/requests' : 'collector/dashboard']);
      })
    );
  }
}