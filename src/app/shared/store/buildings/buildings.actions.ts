import { createAction, props } from '@ngrx/store';
import { Building } from '../../models/building.model';

export const actions = {
  GetAllBuildings: createAction('[Buildings] Get all'),
  GetAllBuildingsSuccess: createAction(
    '[Buildings] Get all success',
    props<{ buildings: Building[] }>()
  ),
  GetAllBuildingsFailure: createAction(
    '[Buildings] Get all failure',
    props<{ message: string }>()
  ),
};
