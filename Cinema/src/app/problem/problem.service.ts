import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProblem } from '../shared/interfaces/problem';

const apiUrl = environment.apiUrl;

@Injectable()
export class ProblemService {

  constructor(private http: HttpClient) { }
  
  createProblem(data: any): Observable<IProblem<any>> {
    return this.http.post<IProblem<any>>(`${apiUrl}/problems/create`, data, { withCredentials: true });
  }

  allProblems(): Observable<IProblem[]> {
    return this.http.get<IProblem[]>(`${apiUrl}/problems/all`, { withCredentials: true });
  }

  deleteProblem(id: string): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/problems/delete/${id}`, { withCredentials: true });
  }
}
