import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';
import { NotificationsService } from 'angular2-notifications';
import { DomSanitizer } from '@angular/platform-browser';
import { Item } from '../../core/models/item.model';

@Component({
	templateUrl: './category-detail.component.html',
	styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
	category: Category = new Category(0, '');
	thumbnails: Item[] = [];

	constructor(
		private route: ActivatedRoute
		, private router: Router
		, private categoryService: CategoryService
		, private notify: NotificationsService
		, public DomSanitizerService: DomSanitizer
	) { }

	ngOnInit(): void {
		const categoryId = this.route.snapshot.params.id
		this.categoryService.getCategory(categoryId).subscribe(category => {
			this.category = category;
		}, err => {
			this.notify.error('Chyba', 'Došlo k problému při načítání detailu kategorie. Zkuste to prosím později.')
		});

		this.categoryService.getItemThumbnails(categoryId, 5).subscribe(thumbnails => {
			this.thumbnails = thumbnails;
		});
	}

	backToCategories() {
		this.router.navigate(['categories']);
	}

}
