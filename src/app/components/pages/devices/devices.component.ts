import { Component, OnInit } from '@angular/core';
import { DeviceModel } from '../../models/device.model';
import { DeviceService } from '../services/device.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeviceFormComponent } from './dialog-device-form/dialog-device-form.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'model', 'reference'];
  devicesModel!: DeviceModel[];
  deviceModel!: DeviceModel;
  dataSource!: DeviceModel[];

  constructor(public dialog: MatDialog, private _deviceService: DeviceService) { }

  ngOnInit() {
    this.loadData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogDeviceFormComponent, {data: this.deviceModel, disableClose: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this._deviceService.createDevice(result).subscribe((resultado) => {
          this.loadData();
          Swal.fire({
            icon: 'success',
            title: 'Creado!',
            text: 'Se creo el dispositivo!',
            showCancelButton: false,
            confirmButtonText: 'OK',
            buttonsStyling: false,

            customClass: {
              confirmButton: 'btn btn-primary px-4',
              cancelButton: 'btn btn-danger ms-2 px-4',

            },
          });
        });
      }
    });
  }

  loadData() {
    this._deviceService.findAllDevices().subscribe(
      (response: any) => {
        const devicesModel = response.data.devices as DeviceModel[];
        this.devicesModel = devicesModel;
        this.dataSource = this.devicesModel.sort((a , b) => (b?.idDevice || 0) - (a?.idDevice || 0));
        console.log(response);
      });
  }

}
