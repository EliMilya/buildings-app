import { Building } from 'src/app/shared/models/building.model';
import { BuildingsService } from 'src/app/shared/services/buildings.service';
import { Observable } from 'rxjs';
import { selectBuildings } from '../../shared/store/buildings/buildings.selector';
import { Store } from '@ngrx/store';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-buildings-list',
  template: `
    <div class="list-container">
      Buildings list
      <div class="list-container__names">
        <ul class="list">
          <li
            (click)="getAndPassBuilding(building)"
            class="list__item"
            *ngFor="let building of buildings$ | async; let index = index"
          >
            {{ index + 1 }}.{{ building.name }}
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./buildings-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingsListComponent {
  buildings$: Observable<Building[]> = this.store.select(selectBuildings);

  constructor(
    private buildingsService: BuildingsService,
    private store: Store
  ) {}

  getAndPassBuilding(building: Building) {
    this.buildingsService.passBuilding(building);
  }
}
