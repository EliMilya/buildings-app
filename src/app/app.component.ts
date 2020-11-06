import { actions as AuthActions } from './shared/store/auth/auth.actions';
import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAuthIsLoggedIn,
  selectAuthLoading,
} from './shared/store/auth/auth.selector';

@Component({
  selector: 'app-root',
  template: `
    <div style="position:relative;">
      <button *ngIf="isLoggedIn$ | async" class="logout" (click)="onLogout()">
        Logout
      </button>
      <app-loader *ngIf="authLoading$ | async" class="loader"></app-loader>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  authLoading$: Observable<boolean> = this.store.select(selectAuthLoading);
  isLoggedIn$: Observable<boolean> = this.store.select(selectAuthIsLoggedIn);

  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('token');
    if (potentialToken !== null) {
      this.authService.setToken(potentialToken);
    }
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.LogoutUser());
  }
}
