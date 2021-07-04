import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotificationsService } from 'angular2-notifications';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/authentication/user.service';
import { ModalService } from '../../core/modal.service';
import { Subject } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'user-dashboard',
	templateUrl: './user-dashboard.component.html',
	styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
	users: User[] = [];
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	public modal: NgbModalRef;

	constructor(
		private modalService: ModalService
		, private router: Router
		, private userService: UserService
		, private notify: NotificationsService
	) { }

	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;

	ngOnInit(): void {
		this.dtOptions = {
			pagingType: 'full_numbers'
		};

		this.userService.getUsers()
			.subscribe(
				res => {
					this.users = res;
					this.dtTrigger.next();
				},
				err => {
					console.log(err);
					this.notify.error('Error', 'Nastala chyba při načítání uživatelů.')
				}
			);
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	editUser(userId) {
		this.router.navigate(['/admin/edit-user/' + userId]);
	}

	deleteUser(userId) {
		this.modalService.openDeleteModal('User').result.then(res => {
			this.userService.delete(userId).subscribe(
				res2 => {
					this.notify.success('Success', 'The User was successfully deleted.');
					const i = this.users.map(u => u.id).indexOf(userId);
					if (i > -1) {
						this.users.splice(i, 1);
					}
				},
				err => {
					this.notify.error('Error', 'Error during deleting user.');
				}
			);
		});
	}

}
