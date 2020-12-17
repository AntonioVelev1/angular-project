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
    return this.http.post<IProblem<IUser>>(`${apiUrl}/problems/create`, data, { withCredentials: true }).pipe(
      tap((post: IProblem) => this.currentProblem = post)
    );
  }

  allProblems(): Observable<IProblem[]> {
    return this.http.get<IProblem[]>(`${apiUrl}/problems/all`, { withCredentials: true });
  }

  details(id): Observable<IProblem> {
    return this.http.get<IProblem>(`${apiUrl}/problems/details/${id}`, { withCredentials: true });
  }

  editProblem(data): Observable<IProblem<IUser>> {
    return this.http.put<IProblem<IUser>>(`${apiUrl}/problems/edit/${data.problemId}`, data.formData, { withCredentials: true }).pipe(
      tap((problem: IProblem) => this.currentProblem = problem)
    );
  }

  deleteProblem(id: string): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/problems/delete/${id}`, { withCredentials: true });
  }
}
