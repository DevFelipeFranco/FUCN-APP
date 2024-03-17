import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonComponent } from './person/person.component';
import { RequestComponent } from './request/request.component';
import { RequestTypeFormComponent } from './request-type-form/request-type-form.component';
import { DevicesComponent } from './devices/devices.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    //canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'persona', component: PersonComponent },
      { path: 'solicitud', component: RequestComponent },
      { path: 'requestType', component: RequestTypeFormComponent },
      { path: 'device', component: DevicesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
