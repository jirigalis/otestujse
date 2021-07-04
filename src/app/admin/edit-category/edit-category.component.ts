import { Component, OnInit } from '@angular/core';
import { Category } from '../../core/models/category.model';
import { CategoryService } from '../../core/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
	selector: 'edit-category',
	templateUrl: './edit-category.component.html',
	styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
	category: Category = new Category(null, '');
	submitFunction = this.onSubmit;

	constructor(
		private categoryService: CategoryService,
		private router: Router,
		private route: ActivatedRoute,
		private notify: NotificationsService
	) {
		const categoryId = this.route.snapshot.params.id;
		this.categoryService.getCategory(categoryId).subscribe(
			res => {
				console.log(res);
				this.category = res;
			},
			err => {
				this.notify.error('Error', 'Error while loading category!');
			}
		);
	}

	ngOnInit() {
	}

	onSubmit(category) {
		this.categoryService.update(category).subscribe(
			res => {
				this.notify.success('Success', 'Changes have been successfully saved.');
				this.router.navigate(['/admin/category']);
			},
			err => {
				console.log(err);
				// TODO: better error message handling
				this.notify.error('Error', 'Error during saving changes. Try again later.');
			}
		);
	}

}
