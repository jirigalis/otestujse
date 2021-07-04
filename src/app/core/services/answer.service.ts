import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Answer } from '../models/answer.model';

@Injectable({
	providedIn: 'root'
})
export class AnswerService {

	private httpOptions = {
		headers: new HttpHeaders({'Content-Type': 'application/json'})
	};
	private answerUrl = 'api/answers';

  	constructor(private http: HttpClient) { }

  	getAll(): Observable<Answer[]> {
  		return this.http.get<Answer[]>(this.answerUrl);
	}
}
