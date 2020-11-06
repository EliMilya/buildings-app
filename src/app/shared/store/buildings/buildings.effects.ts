import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { actions as BuildingsActions } from './buildings.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BuildingsService } from '../../services/buildings.service';

@Injectable()
export class BuildingsEffects {
  constructor(
    private actions$: Actions,
    private buildingsService: BuildingsService,
    private router: Router
  ) {}

  getAllBuildings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuildingsActions.GetAllBuildings),
      concatMap(() =>
        this.buildingsService.getAllBuildings().pipe(
          map((buildings) =>
            BuildingsActions.GetAllBuildingsSuccess({ buildings })
          ),
          catchError((message) =>
            of(BuildingsActions.GetAllBuildingsFailure({ message }))
          )
        )
      )
    )
  );
}
