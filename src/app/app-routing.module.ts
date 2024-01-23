import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripControlComponent } from './trip-control/trip-control.component';
import { NewLayoutComponent } from './new-layout/new-layout.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: TripControlComponent },
  { path: 'new-layout', pathMatch: 'full', component: NewLayoutComponent },
  { path: 'callback', pathMatch: 'full', component: AuthLoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
