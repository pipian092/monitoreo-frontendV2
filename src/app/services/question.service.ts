import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from 'app/interfaces/Department.interface';
import { Question } from 'app/interfaces/Question.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly baseUrl: string = environment.baseUrl;
  token: string = '';


  constructor(private readonly http: HttpClient) {

    this.token = localStorage.getItem('token');

  }

  create(question: Question): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.post(`${this.baseUrl}/questions`, question, { headers });
  }

  update(question: Question, id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.put(`${this.baseUrl}/questions/${id}`, question, { headers });
  }

  getAll() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.get(`${this.baseUrl}/questions`, { headers });
  }

  findOne(id: number) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.get(`${this.baseUrl}/questions/` + id, { headers });
  }
}
