import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';

import { Category } from '../models/category.model';
import { Item } from '../models/item.model';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {

	private httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	private categoriesUrl = 'api/categories';

	constructor(private http: HttpClient) {
	}

	getCategories(): Observable<Category[]> {
		return this.http.get<Category[]>(this.categoriesUrl);
	}

	getCategoriesList(): Observable<any> {
		return this.http.get(this.categoriesUrl + '/list');
	}

	getCategoriesWithStats(): Observable<Category[]> {
		return this.http.get<Category[]>(this.categoriesUrl + '/stats');
	}

	getCategory(id: number): Observable<Category> {
		const url = `${this.categoriesUrl}/${id}`;
		return this.http.get<Category>(url).pipe(
			catchError(this.handleError<Category>(`getCategory id=${id}`))
		);
	}

	getCategoriesByQuestionId(id: number): Observable<Category[]> {
		const url = `${this.categoriesUrl}/question/${id}`;
		return this.http.get<Category[]>(url).pipe(
			catchError(this.handleError<Category[]>(`getCategoriesByQuestionid id=${id}`))
		);
	}

	getItemThumbnails(id: number, count: number): Observable<Item[]> {
		const url = `${this.categoriesUrl}/${id}/thumbnails`;
		const params = new HttpParams().set('count', count.toString());
		return this.http.get<Item[]>(url, { params: params });
	}

	update(category: Category): Observable<any> {
		const url = `${this.categoriesUrl}/${category.id}`;
		return this.http.put(url, category, this.httpOptions);
	}

	public create(category: Category) {
		const url = `${this.categoriesUrl}/new`;
		category.img = category.img.replace(/^.*\\/, '');
		return this.http.post(url, category);
	}

	delete(id: number) {
		const url = `${this.categoriesUrl}/delete/${id}`;
		return this.http.delete(url);
	}

	setCategoryStatus(categoryId: Number, status: Number) {
		const url = `${this.categoriesUrl}/${categoryId}/status`;
		return this.http.put(url, { status: status }, this.httpOptions);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);

			return of(result as T);
		};
	}

}
