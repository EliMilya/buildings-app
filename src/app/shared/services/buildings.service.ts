import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Building } from '../models/building.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BuildingsService {
  private buildingSource = new BehaviorSubject<Building>(null);
  currentBuilding = this.buildingSource.asObservable();
   
  constructor(private http: HttpClient) {}

  getAllBuildings(): Observable<Building[]> {
    return this.http
      .get<{ buildings: Building[] }>(
        `${environment.url}${environment.buildings}`
      )
      .pipe(map((data) => data.buildings));
  }

  passBuilding(building: Building){
    this.buildingSource.next(building)
  }
}
