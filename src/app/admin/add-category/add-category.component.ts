import { Component, OnInit } from '@angular/core';

import { Category } from '../../core/models/category.model';
import { CategoryService } from '../../core/services/category.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
	selector: 'add-category',
	templateUrl: './add-category.component.html',
	styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

	newCategory: Category = new Category(null, '');

	constructor(
		private categoryService: CategoryService,
		private notify: NotificationsService,
		private router: Router
	) {
	}

	ngOnInit() {

	}

	onSubmit(category) {
		this.categoryService.create(category).subscribe(
			res => {
				this.notify.success('Success', 'New category successfully created.');
				this.router.navigate(['/admin/category']);
			},
			err => {
				this.notify.error('Error', 'Category with name \'' + category.name + '\' already exists.');
			}
		);
	}

}
