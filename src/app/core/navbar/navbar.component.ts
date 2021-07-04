import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../authentication/user.service';
import { NotificationsService } from 'angular2-notifications';
import { User } from '../models/user.model';

@Component({
	selector: 'app-navbar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	public toggleOpaqueClass = true;
	public onHomePage: boolean;
	public isAdminPanel = false;
	public currentUser: User;

	constructor(
		public el: ElementRef,
		private userService: UserService,
		private location: Location,
		private router: Router,
		private notify: NotificationsService,
		private cd: ChangeDetectorRef
	) {
		this.isAdminPanel = location.path().includes('/admin');
		this.onHomePage = location.path() === '' || location.path() === '/login';

		this.router.events.subscribe(res => {
			this.onHomePage = location.path() === '' || location.path() === '/login';
			this.toggleOpaqueClass = this.onHomePage;
			this.isAdminPanel = location.path().includes('/admin');
		});

		this.userService.currentUser.subscribe(user => {
			this.cd.markForCheck();
			return this.currentUser = user;
		});
	}

	ngOnInit() {
		this.toggleOpaqueClass = this.onHomePage;
	}

	@HostListener('window:scroll', ['$event']) checkScroll() {
		this.toggleOpaqueClass = window.pageYOffset < 80 && this.onHomePage;
	}

	get isAdmin() {
		return this.currentUser && this.currentUser.role === 1;
	}

	public logout() {
		this.userService.logout();
		this.notify.success('Success', 'You were successfully signed out');
		this.router.navigate(['/']);
	}
}
