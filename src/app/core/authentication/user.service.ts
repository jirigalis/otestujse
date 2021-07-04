import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Role } from '../enums/role.enum';
import { CryptoService } from '../services/crypto.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;
	private usersUrl = 'api/users';
	private loginUrl = 'api/login';
	private jwtHelper = new JwtHelperService();


	constructor(
		private http: HttpClient
		, private crypto: CryptoService
	) {
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	public static getCurrentUser(): User {
		if (localStorage.getItem('user') === null) {
			return null;
		}
		const userString = JSON.parse(localStorage.getItem('user'));
		return new User(userString.id, userString.login, userString.role, userString.name);
	}

	public static getToken() {
		return localStorage.getItem('token');
	}

	public static isAdmin(): boolean {
		const user = this.getCurrentUser();
		return user ? user.role === 1 : false;
	}

	public logout() {
		console.log('Logout performed');
		localStorage.clear();
		this.currentUserSubject.next(null);
	}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.usersUrl)
			.pipe(
				catchError(this.handleError('getUsers', []))
			);
	}

	login(email: string, password: string) {
		const user = {
			email: email,
			password: this.crypto.encrypt(password)
		};
		return this.http.post<any>(this.loginUrl, user).pipe(
			map(res => {
				if (res && res.token) {
					localStorage.setItem('token', res.token);
					localStorage.setItem('user', JSON.stringify(res.user));
					this.currentUserSubject.next(res.user);
				}
			})
		);
	}

	public isLoggedIn(): boolean {
		const token = localStorage.getItem('token');
		return token !== null && !this.jwtHelper.isTokenExpired(token);
	}

	signUp(email: string, password: string, firstname: string, lastname: string): Observable<any> {
		return this.create(email, password, firstname, lastname, Role.USER);
	}

	getUser(id: number) {
		return this.http.get<User>(this.usersUrl + '/' + id);
	}

	create(email: string, password: string, firstname: string, lastname: string, role: Role) {
		const user = {
			email: email,
			password: this.crypto.encrypt(password),
			firstname: firstname,
			lastname: lastname,
			role: role
		};

		return this.http.post<User>(this.usersUrl + '/new', user);
	}

	update(data) {
		const user = {
			id: data.id,
			email: data.email,
			firstname: data.firstname,
			lastname: data.lastname,
			password: undefined,
			role: data.role
		};

		if (typeof data.password !== 'undefined') {
			user.password = this.crypto.encrypt(data.password);
		}

		console.log(user);

		return this.http.put<User>(this.usersUrl + '/update/' + data.id, user);
	}

	delete(id: number) {
		const url = `${this.usersUrl}/delete/${id}`;
		return this.http.delete(url);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			return of(result as T);
		};
	}


}
