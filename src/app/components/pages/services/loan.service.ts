import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanModel } from '../../models/loan.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private _httpClient: HttpClient) { }

  public addLoan(loan: LoanModel): Observable<any> {
    return this._httpClient.post<any>('https://projectfucn-production.up.railway.app/api/v1/loans/create-loan', loan);
  }
}
