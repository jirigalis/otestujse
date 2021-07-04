import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../core/models/category.model';
import { CategoryService } from '../../core/services/category.service';

@Component({
	selector: 'category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
	categories: Category[];

	constructor(
		private categoryService: CategoryService
		, private router: Router
	) { }

	ngOnInit() {
		this.categoryService.getCategories().subscribe(categories => {
			this.categories = categories;
		}, err => {
			console.log(err);
		});
	}

}
