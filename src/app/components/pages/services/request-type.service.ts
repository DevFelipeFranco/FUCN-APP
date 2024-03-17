import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestTypeModel } from '../../models/request-type.model';

@Injectable({
  providedIn: 'root'
})
export class RequestTypeService {

  constructor(private _httpClient: HttpClient) { }

  public findAllRequestType(): Observable<any> {
    return this._httpClient.get<any>(`http://localhost:8080/api/v1/requestType`);
  }

  public createRequestType(requestType: RequestTypeModel): Observable<any> {
    return this._httpClient.post<any>(`http://localhost:8080/api/v1/requestType/create-request-type`, requestType);
  }
}
