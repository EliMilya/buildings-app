import { Building } from 'src/app/shared/models/building.model';
import { BuildingsService } from 'src/app/shared/services/buildings.service';
import { Subscription } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-building-details',
  template: `
    <div class="details-container">
      <h3>
        {{ building.id }}. {{ building.name }}({{ building.description }})
      </h3>
      <p>Height: {{ building.height }}</p>
      <p>Floors: {{ building.floors }}</p>
      <p>Year: {{ building.year }}</p>
      <img class="image" src="../../../assets/images/{{ building.name }}.jpg" />
    </div>
  `,
  styleUrls: ['./building-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingDetailsComponent implements OnInit, OnDestroy {
  currentBuildSub: Subscription;
  building: Building = {
    id: 1,
    name: 'Burj Khalifa',
    height: 828,
    floors: 163,
    year: 2010,
    description: 'Dubai, United Arab Emirates',
  };

  constructor(
    private buildingsService: BuildingsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentBuildSub = this.buildingsService.currentBuilding.subscribe(
      (currentBuilding) => {
        if (!currentBuilding) return;
        this.building = currentBuilding;
        this.cdr.markForCheck();
      }
    );
  }

  ngOnDestroy(): void {
    this.currentBuildSub.unsubscribe();
  }
}
