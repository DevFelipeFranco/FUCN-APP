import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageRoutingModule } from './page-routing.module';
import { MaterialModule } from '../shared/material.module';
import { CustomSidenavComponent } from './custom-sidenav/custom-sidenav.component';
import { PersonComponent } from './person/person.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PersonService } from './services/person.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RequestComponent } from './request/request.component';
import { RequestTypeFormComponent } from './request-type-form/request-type-form.component';
import { DialogRequestTypeFormComponent } from './request-type-form/dialog-request-type-form/dialog-request-type-form.component';
import { DevicesComponent } from './devices/devices.component';
import { DialogDeviceFormComponent } from './devices/dialog-device-form/dialog-device-form.component';



@NgModule({
  declarations: [PagesComponent, DashboardComponent, CustomSidenavComponent, PersonComponent, RequestComponent, RequestTypeFormComponent, DialogRequestTypeFormComponent, DevicesComponent, DialogDeviceFormComponent],
  exports: [PagesComponent, DashboardComponent, PersonComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [HttpClient, PersonService],
})
export class PagesModule { }
