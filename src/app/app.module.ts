import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AuthEffects } from './shared/store/auth';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { BrowserModule } from '@angular/platform-browser';
import { BuildingDetailsComponent } from './components/building-details/building-details.component';
import { BuildingsLayoutComponent } from './components/buildings-layout.component';
import { BuildingsListComponent } from './components/buildings-list/buildings-list.component';
import { ChartsModule } from 'ng2-charts';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from './shared/helpers/loader/loader.component';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TokenInterceptor } from './shared/classes/interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { reducers } from './shared/store/app.states';
import { BuildingsEffects, buildingsReducer } from './shared/store/buildings';
import { metaReducers } from './shared/store/metareducers/metareducer';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    BarChartComponent,
    BuildingDetailsComponent,
    BuildingsListComponent,
    BuildingsLayoutComponent,
    LoaderComponent,
  ],
  imports: [
    EffectsModule.forRoot([AuthEffects]),
    EffectsModule.forFeature([BuildingsEffects]),
    AppRoutingModule,
    BrowserModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreModule.forFeature('buildings', buildingsReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
