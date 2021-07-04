import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../../core/authentication/user.service';
import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Pipe({
	name: 'image'
})
export class ImagePipe implements PipeTransform {

	constructor(private http: HttpClient) { }

	transform(url: string): Observable<any> {
		const headers = new HttpHeaders({ 'x-access-token': UserService.getToken(), 'Content-Type': 'image/*' });
		console.log();
		// return this.http.get(url, { headers: headers });
		return of('/api/public/uploads/24/49.png');
	}

}
