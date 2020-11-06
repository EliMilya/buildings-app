import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { selectAuthIsLoggedIn } from '../store/auth/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // if (this.authService.isAuthenticated()) {
    //   return of(true);
    // } else {
    //   this.router.navigate(['/login']);
    //   return of(false);
    // }
    return this.store.select(selectAuthIsLoggedIn).pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      })
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }
}
