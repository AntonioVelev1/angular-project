import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interfaces';
import { IProblem } from '../shared/interfaces/problem';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class ProblemService {

  currentProblem: IProblem | null;
 
  constructor(private http: HttpClient) { }
 
  createProblem(data): Observable<IProblem<IUser>> {
    return this.http.post<IProblem<IUser>>(`/problems/create`, data).pipe(
      tap((post: IProblem) => this.currentProblem = post)
    );
  }

  allProblems(): Observable<IProblem[]> {
    return this.http.get<IProblem[]>(`/problems/all`);
  }

  details(id): Observable<IProblem> {
    return this.http.get<IProblem>(`/problems/details/${id}`);
  }

  editProblem(data): Observable<IProblem<IUser>> {
    return this.http.put<IProblem<IUser>>(`/problems/edit/${data.problemId}`, data.formData).pipe(
      tap((problem: IProblem) => this.currentProblem = problem)
    );
  }

  deleteProblem(id: string): Observable<any> {
    return this.http.delete<any>(`/problems/delete/${id}`);
  }
}
