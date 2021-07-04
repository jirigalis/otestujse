import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService } from 'angular2-notifications';

import { Category } from '../../core/models/category.model';
import { UtilsService } from '../../core/utils.service';
import { CategoryService } from '../../core/services/category.service';
import { Router } from '@angular/router';

@Component({
	selector: 'category-form',
	templateUrl: './category-form.component.html',
	styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

	public categoryModel: Category;
	public loadingImg = false;
	@Input() submitFunction;

	constructor(
		public DomSanitizerService: DomSanitizer,
		private notify: NotificationsService,
		private utils: UtilsService,
		private categoryService: CategoryService,
		private router: Router
	) {
	}

	ngOnInit() {
	}

	@Input()
	set category(category: Category) {
		this.categoryModel = category;
	}

	onSubmit(value) {
		this.submitFunction(this.categoryModel);
	}

	parseImage(event) {
		this.loadingImg = true;
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (loadEvent) => {
			const img = <FileReader>loadEvent.target;
			const imgStr: string = <string>img.result;
			const extension = this.utils.getExtensionFromFilename(file.name);
			// prevent from uploading non-image files
			const allowedExtensions = ['jpg', 'jpeg', 'png'];

			if (allowedExtensions.includes(extension.toLowerCase())) {
				this.categoryModel.img = 'data:image/' + extension + ';charset=utf-8;base64,' + btoa(imgStr);
				this.loadingImg = false;
			} else {
				this.notify.error('Error', 'Only JPG or PNG are allowed.');
				this.loadingImg = false;
			}
		};

		reader.readAsBinaryString(file);
	}

}
