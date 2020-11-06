import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BuildingsState } from './buildings.reducer';

export const selectBuildingsState = createFeatureSelector<BuildingsState>(
  'buildings'
);

export const selectBuildings = createSelector(
  selectBuildingsState,
  (state) => state?.buildings
);
