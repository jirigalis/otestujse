import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../core/models/category.model';

@Component({
	selector: 'category-thumbnail',
	templateUrl: './category-thumbnail.component.html',
	styleUrls: ['./category-thumbnail.component.scss']
})
export class CategoryThumbnailComponent implements OnInit {

	@Input() category: Category;

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	openCategoryDetail(id) {
		this.router.navigate(["/categories/" + id]);
	}

}
