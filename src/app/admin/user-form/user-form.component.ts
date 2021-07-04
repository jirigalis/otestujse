import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../../core/authentication/user.service';
import { User } from '../../core/models/user.model';

@Component({
	selector: 'user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

	userModel: any;
	@Input() submitFunction;
	@Input() editMode = false;

	constructor(
		private notify: NotificationsService
		, private userService: UserService
		, private router: Router
	) { }

	ngOnInit(): void {
	}

	@Input()
	set user(user: User) {
		this.userModel = user;
	}

	onSubmit(value) {
		console.log(value);
		this.submitFunction(this.userModel);
	}

}
