import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8085/api/v1/exams';
  private attemptsUrl = 'http://localhost:8085/api/v1/attempts';

  createExam(examData: any): Observable<any> {
    return this.http.post(this.apiUrl, examData);
  }

  getExamById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateExam(id: number, examData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, examData);
  }

  getAllExams(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getActiveExams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/active`);
  }

  getExamByCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/code/${code}`);
  }

  startExam(examId: number): Observable<any> {
    return this.http.post<any>(`${this.attemptsUrl}/start/${examId}`, {});
  }

  submitExam(attemptId: number, payload: any): Observable<any> {
    return this.http.post<any>(`${this.attemptsUrl}/${attemptId}/submit`, payload);
  }
}
