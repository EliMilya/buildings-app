import { createAction, props } from '@ngrx/store';
import { User } from '../../../shared/models/user';

export const actions = {
  LoginUser: createAction('[Auth] Login', props<{ user: User }>()),
  LoginUserSuccess: createAction(
    '[Auth] Login success',
    props<{ token: any }>()
  ),
  LoginUserFailure: createAction(
    '[Auth] Login failure',
    props<{ message: string }>()
  ),
  LogoutUser: createAction('[Auth] Logout'),
};
