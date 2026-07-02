import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  protected api = 'http/api'; // Substitua pela URL do Laravel futuramente

  constructor(private http: HttpClient) { }

  save(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(this.api, project);
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.api);
  }

  getById(id: number | string): Observable<Project> {
    return this.http.get<Project>(`${this.api}/${id}`);
  }

  update(id: number | string, project: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.api}/${id}`, project);
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}