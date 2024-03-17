import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceModel } from '../../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private _httpClient: HttpClient) { }

  public findAllDevices(): Observable<any> {
    return this._httpClient.get<any>(`https://projectfucn-production.up.railway.app/api/v1/device`);
  }

  public createDevice(requestType: DeviceModel): Observable<any> {
    return this._httpClient.post<any>(`https://projectfucn-production.up.railway.app/api/v1/device/create-device`, requestType);
  }
}
