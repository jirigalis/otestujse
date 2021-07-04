import { Injectable } from '@angular/core';
import { UserService } from './core/authentication/user.service';
import {
	HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(
		private userService: UserService
	) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.userService.isLoggedIn) {
			const jwtToken = UserService.getToken();
			req = req.clone({
				setHeaders: {
					'x-access-token': `${jwtToken}`,
					// 'Content-Type': 'application/json'
				}
			});
		}

		return next.handle(req);
	}
}
