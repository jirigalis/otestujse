import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Question } from '../models/question.model';

@Injectable({
	providedIn: 'root'
})
export class QuestionService {

	private httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	private questionsUrl = 'api/questions';

	constructor(private http: HttpClient) {
	}

	getQuestions(): Observable<Question[]> {
		return this.http.get<Question[]>(this.questionsUrl);
	}

	getQuestion(id: number) {
		const url = `${this.questionsUrl}/${id}`;
		return this.http.get<Question>(url);
	}

	getQuestionWithCategories(id: number) {
		const url = `${this.questionsUrl}/categories/${id}`;
		return this.http.get<Question>(url);
	}

	create(question: Question): Observable<any> {
		const url = `${this.questionsUrl}/new`;
		return this.http.post(url, question, this.httpOptions);
	}

	update(question: Question): Observable<any> {
		const url = `${this.questionsUrl}/${question.id}`;
		return this.http.put(url, question, this.httpOptions);
	}

	delete(id: number) {
		const url = `${this.questionsUrl}/delete/${id}`;
		return this.http.delete(url);
	}

	setQuestionStatus(questionId: Number, status: Number) {
		const url = `${this.questionsUrl}/${questionId}/status`;
		return this.http.put(url, { status: status }, this.httpOptions);
	}
}
