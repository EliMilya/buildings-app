import { Action, createReducer, on } from '@ngrx/store';
import { actions as AuthActions } from './auth.actions';

export interface AuthState {
  loading: boolean;
  token: string;
  isLoggedIn: boolean;
}

export const AuthInitialState: AuthState = {
  loading: false,
  token: null,
  isLoggedIn: false,
};

export const authReducer = createReducer(
  AuthInitialState,

  on(AuthActions.LoginUser, (state) => ({ ...state, loading: true })),

  on(AuthActions.LoginUserSuccess, (state, { token }) => ({
    ...state,
    loading: false,
    token,
    isLoggedIn: true,
  })),

  on(AuthActions.LoginUserFailure, (state) => ({ ...state, loading: false })),

  on(AuthActions.LogoutUser, (state) => AuthInitialState)
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
