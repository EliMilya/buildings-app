import { Action, createReducer, on } from '@ngrx/store';
import { Building } from '../../models/building.model';
import { actions as BuildingsActions } from './buildings.actions';

export interface BuildingsState {
  loading: boolean;
  buildings: Building[];
}

export const BuildingInitialState: BuildingsState = {
  loading: false,
  buildings: null,
};

export const buildingsReducer = createReducer(
  BuildingInitialState,

  on(BuildingsActions.GetAllBuildings, (state) => ({
    ...state,
    loading: true,
  })),

  on(BuildingsActions.GetAllBuildingsSuccess, (state, { buildings }) => ({
    ...state,
    loading: false,
    buildings,
  })),

  on(BuildingsActions.GetAllBuildingsFailure, (state) => ({
    ...state,
    loading: false,
  })),
);

export function reducer(state: BuildingsState | undefined, action: Action) {
  return buildingsReducer(state, action);
}
