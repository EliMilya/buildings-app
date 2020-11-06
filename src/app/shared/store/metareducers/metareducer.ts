import { ActionReducer, INIT, MetaReducer } from '@ngrx/store';
import { actions as AuthActions } from '../auth/auth.actions';

export function logout(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (action != null && action.type === AuthActions.LogoutUser.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [logout];
