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
    return this.http.post<IComment<IUser>>(`/comments/create`, data).pipe(
      tap((comment: IComment | null) => this.currentComment = comment)
    )
  }

  editComment(data): Observable<any>{
    return this.http.put<any>(`/comments/edit/${data.commentId}`, {content: data.content, user: data.user});
  } 
 
  deleteComment(data): Observable<any> {
    return this.http.get<any>(`/comments/delete/${data.commentId}?problemId=${data.problemId}&userId=${data.userId}`);
  }

}
