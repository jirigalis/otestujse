import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
	providedIn: 'root'
})
export class ItemService {
	private httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	private itemUrl = 'api/items';

	constructor(private http: HttpClient) { }

	getAll(): Observable<Item[]> {
		return this.http.get<Item[]>(this.itemUrl);
	}

	getItem(id: number) {
		const url = `${this.itemUrl}/${id}`;
		return this.http.get<Item>(url);
	}

	create(item: FormData): Observable<any> {
		const url = `${this.itemUrl}/new`;
		const headers = new HttpHeaders();
		headers.append('enctype', 'multipart/form-data');

		return this.http.post(url, item, {
			reportProgress: false,
			headers: headers
		});
	}

	update(id, data: FormData): Observable<any> {
		const url = `${this.itemUrl}/update/${id}`;
		const headers = new HttpHeaders();
		headers.append('enctype', 'multipart/form-data');
		return this.http.put(url, data, {
			reportProgress: false,
			headers: headers
		});
	}

	delete(id: number) {
		const url = `${this.itemUrl}/delete/${id}`;
		return this.http.delete(url);
	}
}
