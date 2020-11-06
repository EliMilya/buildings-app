import { actions as BuildingsActions } from '../shared/store/buildings/buildings.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-buildings-layout',
  template: `
    <h1 class="title">List of tallest buildings</h1>
    <div class="main-container">
      <div class="main-container__chart">
        <app-bar-chart></app-bar-chart>
      </div>
      <div class="main-container__buildings">
        <app-buildings-list></app-buildings-list>
        <app-building-details></app-building-details>
      </div>
    </div>
  `,
  styleUrls: ['./buildings-layout.component.scss'],
})
export class BuildingsLayoutComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(BuildingsActions.GetAllBuildings());
  }
}
