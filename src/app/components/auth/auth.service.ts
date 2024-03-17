import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel, UserLoged } from '../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: any;
  public host = 'https://projectfucn-production.up.railway.app/api/v1';
  
  constructor(private _httpClient: HttpClient) { }

  public addBook(login: LoginModel): Observable<HttpResponse<UserLoged>> {
    return this._httpClient.post<UserLoged>(`${this.host}/auth/login`, login, { observe: 'response' });
  }

  public signup(login: LoginModel): Observable<HttpResponse<UserLoged>> {
    return this._httpClient.post<UserLoged>(`${this.host}/auth/register`, login, { observe: 'response' });
  }

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: UserLoged): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  public getUserFromLocalCache(): UserLoged {
    const userString: string | null = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }
}
