import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    private http = inject(HttpClient);
    // Using the same port 8085 as exam service
    private apiUrl = 'http://localhost:8085/api/v1/questions';

    createQuestion(questionData: any): Observable<any> {
        return this.http.post(this.apiUrl, questionData);
    }

    getAllQuestions(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getQuestionById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    updateQuestion(id: number, questionData: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, questionData);
    }

    deleteQuestion(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
