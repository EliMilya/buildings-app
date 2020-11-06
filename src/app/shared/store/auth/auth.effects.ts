import { actions as AuthActions } from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/shared/services/auth.service';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginUser),
      concatMap(({ user }) =>
        this.authService.login(user).pipe(
          map((token) => AuthActions.LoginUserSuccess({ token })),
          catchError((message) => of(AuthActions.LoginUserFailure({ message })))
        )
      )
    )
  );

  userLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LoginUserSuccess),
        tap(({ token }) => {
          this.router.navigate(['/buildings']);
          localStorage.setItem('token', token);
        })
      ),
    { dispatch: false }
  );

  userLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LogoutUser),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
