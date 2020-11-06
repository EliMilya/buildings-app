import { actions as AuthActions } from '../shared/store/auth/auth.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { selectAuthLoading } from '../shared/store/auth/auth.selector';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-auth',
  template: `
    <ng-container *ngIf="!authLoading">
      <div class="container">
        <div class="login-box">
          <h2 style="text-align: center">Please, log in</h2>
          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="login-form">
              <input
                class="login-form__input"
                type="text"
                formControlName="email"
                placeholder="Email"
                required
              />
              <small
                class="login-form__error"
                *ngIf="
                  this.form.get('email').invalid &&
                  this.form.get('email').touched
                "
                >Value must be entered</small
              >
              <input
                class="login-form__input"
                type="password"
                formControlName="password"
                placeholder="Password"
                required
              />
              <small
                class="login-form__error"
                *ngIf="
                  this.form.get('password').invalid &&
                  this.form.get('password').touched
                "
                >Value must be entered</small
              >
              <button class="login-form__button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loginSub: Subscription;
  authLoading: boolean = false;
  authLoadingSub: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Initialization of our form.
    this.initForm();

    this.authLoadingSub = this.store
      .select(selectAuthLoading)
      .subscribe((data) => {
        this.authLoading = data;
      });
  }

  initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  submit(): void {
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    // Dispatch to store with payload.
    this.store.dispatch(AuthActions.LoginUser({ user }));
  }

  ngOnDestroy(): void {
    // Destroy of subscription.
    this.authLoadingSub.unsubscribe();
  }
}
