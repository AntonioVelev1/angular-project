import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interfaces';
import { IComment } from '../shared/interfaces/comment';

const apiUrl = environment.apiUrl;

@Injectable()
export class CommentService {

  currentComment: IComment | null

  constructor(
    private http: HttpClient
  ) { }

  createComment(data): Observable<IComment<IUser>> {
    return this.http.post<IComment<IUser>>(`${apiUrl}/comments/create`, data, { withCredentials: true }).pipe(
      tap((comment: IComment | null) => this.currentComment = comment)
    )
  }

}
