import { Building } from 'src/app/shared/models/building.model';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts/lib/base-chart.directive';
import { selectBuildings } from '../../shared/store/buildings/buildings.selector';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent implements OnInit, OnDestroy {
  buildsSub: Subscription;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];

  constructor(private cdr: ChangeDetectorRef, private store: Store) {}

  ngOnInit(): void {
    this.buildsSub = this.store.select(selectBuildings).subscribe((builds) => {
      if (!builds) return;
      const sortedBuildings = this.sortByYear(builds.slice());
      // Throw filtered arrays to fill charts methods.
      this.fillChartLabels(sortedBuildings);
      this.fillChartDataSet(sortedBuildings);
    });
  }

  // Sort by year function.
  sortByYear = (buildings: Building[]) =>
    buildings.sort((a, b) => a.year - b.year);

  fillChartLabels(buildings: Building[]) {
    const years = buildings.map((b) => b.year);
    years.forEach((y) => this.barChartLabels.push(`${y}`));
    // Use to trigger change detection.
    this.cdr.detectChanges();
  }

  fillChartDataSet(buildings: Building[]) {
    this.barChartData = [];
    for (let index = 0; index < buildings.length; index++) {
      // Temporary Object to push after to data charts mail array.
      const buildingObj: ChartDataSets = {
        data: [],
        label: '',
      };
      buildings.forEach((building, i) => {
        if (index === i) {
          buildingObj.data[i] = building.height;
          buildingObj.label = building.name;
        } else buildingObj.data[i] = 0;
      });
      this.barChartData.push(buildingObj);
    }
    // Use to trigger change detection.
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    // Unsubscribe from subscription.
    this.buildsSub.unsubscribe();
  }
}
