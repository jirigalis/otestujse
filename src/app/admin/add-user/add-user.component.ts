import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Role } from '../../core/enums/role.enum';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/authentication/user.service';

@Component({
	selector: 'add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
	newUser: User = new User(null, '', Role.USER);

	constructor(
		private userService: UserService
		, private notify: NotificationsService
		, private router: Router
	) { }

	ngOnInit(): void {
	}

	onSubmit(user, navigate) {
		console.log(user);
		this.userService.create(user.email, user.password, user.firstname, user.lastname, user.role).subscribe(
			res => {
				this.notify.success('Success', 'Nový uživatel byl úspěšně založen.');
				if (navigate) {
					this.router.navigate(['/admin/user']);
				}
			},
			err => {
				this.notify.error('Error', 'Během vytváření nového uživatele došlo k chybě.');
			}
		);
	}

}
