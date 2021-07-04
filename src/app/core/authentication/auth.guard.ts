import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private userService: UserService) { }

	canActivate(route: ActivatedRouteSnapshot): boolean {
		const jwtHelper = new JwtHelperService();
		const token = jwtHelper.decodeToken(UserService.getToken());

		if (typeof route.data !== 'undefined' && route.data.adminOnly === true) {
			if (this.userService.isLoggedIn() && UserService.isAdmin()) {
				return true;
			} else {
				this.router.navigate(['/login']);
				return false;
			}
		}

		if (this.userService.isLoggedIn()) {
			return true;
		}

		this.userService.logout();
		this.router.navigate(['/login']);
		return false;
	}
}
