import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { BuildingDetailsComponent } from './components/building-details/building-details.component';
import { BuildingsLayoutComponent } from './components/buildings-layout.component';
import { BuildingsListComponent } from './components/buildings-list/buildings-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  {
    path: 'buildings',
    component: BuildingsLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: BarChartComponent },
      { path: '', component: BuildingsListComponent },
      { path: ':id', component: BuildingDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
