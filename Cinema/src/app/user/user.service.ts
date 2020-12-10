import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IUser } from '../shared/interfaces/user';
import { tap } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {

  currentUser: IUser| null;

  constructor(private http: HttpClient) {

  }

  login(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/users/login`, data, { withCredentials: true }).pipe(
      tap((user: IUser | null) => this.currentUser = user)
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/users/register`, data, { withCredentials: true }).pipe(
      tap((user: IUser | null) => this.currentUser = user)
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${apiUrl}/users/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.currentUser = null)
    );
  }

}
