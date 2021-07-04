import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationsService } from 'angular2-notifications';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public loginForm: FormGroup;
	public submitted: false;

	constructor(
		private userService: UserService,
		private formBuilder: FormBuilder,
		private router: Router,
		private notify: NotificationsService
	) {
	}

	get email() {
		return this.loginForm.get('email');
	}

	get password() {
		return this.loginForm.get('password');
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.compose([Validators.required])], // TODO: consider adding email validator
			password: ['', Validators.required]
		});

		const isLoggedIn = this.userService.isLoggedIn();
		if (isLoggedIn) {
			this.router.navigateByUrl('/');
		}
	}

	public login(): void {
		const payload = {
			email: this.loginForm.get('email').value,
			password: this.loginForm.get('password').value
		};

		if (this.loginForm.valid) {
			this.userService.login(payload.email, payload.password)
				.pipe(first())
				.subscribe(
					res => {
						this.notify.success('Success', 'You were successfully logged in.');
						this.router.navigate(['/']);
					},
					err => {
						this.notify.error('Error', 'Your credentials are not valid.');
					}
				);
		} else {
			this.notify.error('Error', 'Form is not valid.');
		}
	}

}
