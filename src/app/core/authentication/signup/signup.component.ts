import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

import { User } from '../../models/user.model';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../user.service';

@Component({
	selector: 'signup-form',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		private notify: NotificationsService
	) {
	}

	get email() {
		return this.signupForm.get('email');
	}

	get name() {
		return this.signupForm.get('name');
	}

	get passwords() {
		return this.signupForm.get('passwords');
	}

	get password() {
		return this.signupForm.get('passwords').get('password');
	}

	get confirmPassword() {
		return this.signupForm.get('passwords').get('confirm-password');
	}

	public error: Observable<string>;
	public signupForm: FormGroup;
	public submitted: boolean;

	private checkPasswords(c: AbstractControl): { invalid: boolean } {
		if (c.get('password').value !== c.get('confirmPassword').value) {
			return { invalid: true };
		}
	}

	ngOnInit() {
		const isLoggedIn = this.userService.isLoggedIn();
		if (isLoggedIn) {
			this.router.navigate(['/']);
		}

		this.signupForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			name: ['', Validators.required],
			passwords: this.formBuilder.group({
				password: ['', Validators.required],
				confirmPassword: ['', Validators.required]
			}, { validator: this.checkPasswords }),
		});
		this.submitted = false;
	}

	public signUp(): void {
		this.submitted = true;
		const payload = {
			email: this.signupForm.get('email').value,
			name: this.signupForm.get('name').value,
			password: this.signupForm.get('passwords').get('password').value,
			confirmPassword: this.signupForm.get('passwords').get('confirmPassword').value,
		};


		if (this.signupForm.invalid) {
			this.notify.error('Error', 'Form is not valid!');
		} else {
			this.userService.signUp(payload.email, payload.password, payload.name, '').subscribe(
				res => {
					this.notify.success('Registration complete', 'Your account was successfully created. Now you can sign in.');
					// this.router.navigate(['/login']);
				},
				err => {
					if (err === 'Conflict') {
						this.notify.error('Error', 'Uživatel s tímto e-mailem již existuje.');
					} else {
						this.notify.error('Error', 'Při vkládání došlo k neočekávené chybě.');
					}
				}
			);
		}
	}

}
