import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { EMPTY, Observable, of } from 'rxjs';
import { IUser } from '../shared/interfaces/user';
import { catchError, tap } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable()
export class UserService {

  currentUser: IUser | null;

  get isLogged(): boolean { return !!this.currentUser; }

  constructor(private http: HttpClient) {

  }

  login(data): Observable<IUser> {
    return this.http.post(`/users/login`, data).pipe(
      tap((user: IUser) => this.currentUser = user)
    );
  }

  register(data): Observable<IUser> {
    return this.http.post(`/users/register`, data).pipe(
      tap((user: IUser | null) => this.currentUser = user)
    );
  }

  logout(): Observable<any> {
    return this.http.post(`/users/logout`, {}).pipe(
      tap(() => this.currentUser = null)
    );
  }

  profile(): Observable<IUser> {
    return this.http.get(`/users/profile`).pipe(
      tap(((user: IUser) => this.currentUser = user)),
      catchError(() => {
        this.currentUser = null;
        return [null];
      })
    );
  }

}
