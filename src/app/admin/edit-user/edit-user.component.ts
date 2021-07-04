import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../../core/authentication/user.service';
import { Role } from '../../core/enums/role.enum';
import { User } from '../../core/models/user.model';

@Component({
	selector: 'edit-user',
	templateUrl: './edit-user.component.html',
	styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

	user: User = new User(null, '', Role.USER);

	constructor(
		private userService: UserService
		, private route: ActivatedRoute
		, private router: Router
		, private notify: NotificationsService
	) { }

	ngOnInit(): void {
		const userId = this.route.snapshot.params.id;
		this.userService.getUser(userId).subscribe(
			res => {
				this.user = res;
			},
			err => {
				console.log(err);
				this.notify.error('Error', 'Error during loading user details');
			}
		);
	}

	onSubmit(user) {
		this.userService.update(user).subscribe(
			res => {
				this.notify.success('Success', 'Changes have been successfully saved.');
				this.router.navigate(['/admin/user']);
			},
			err => {
				console.log(err);
				this.notify.error('Error', 'Error during saving changes. Try again later.');
			}
		);
	}

}
