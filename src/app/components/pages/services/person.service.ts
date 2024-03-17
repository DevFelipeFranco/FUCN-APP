import { Injectable } from '@angular/core';
import { PersonModel } from '../../models/person.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private _httpClient: HttpClient) { }

  public addPerson(person: PersonModel): Observable<any> {
    return this._httpClient.post<any>('https://projectfucn-production.up.railway.app/api/v1/person/create-person', person);
  }

  public findPersonByIdUser(idUser: number): Observable<any> {
    return this._httpClient.get<any>(`https://projectfucn-production.up.railway.app/api/v1/person/${idUser}`);
  }
}
