import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Item } from '../../core/models/item.model';
import { CategoryService } from '../../core/services/category.service';
import { ItemService } from '../../core/services/item.service';
import { UtilsService } from '../../core/utils.service';

@Component({
	selector: 'item-form',
	templateUrl: './item-form.component.html',
	styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
	public itemModel: Item;
	public loadingImg = false;
	public attachment = '';
	public photoPath = '';
	public allCategories = [];
	public showSaveNewButton = false;
	@Input() submitFunction;
	@Input() editMode = false;

	constructor(
		private notify: NotificationsService
		, private utils: UtilsService
		, private categoryService: CategoryService
		, private itemService: ItemService
		, private router: Router
		, private DomSanitizerService: DomSanitizer

	) { }

	ngOnInit(): void {
		this.categoryService.getCategoriesList().subscribe(
			res => {
				this.allCategories = res;
			}
		);

		if (this.router.url === '/admin/add-item') {
			this.showSaveNewButton = true;
		}
	}

	@Input()
	set item(item: Item) {
		this.itemModel = item;
		if (typeof item.categories !== 'undefined') {
			this.photoPath = '/api' + item.filename;
		}
	}

	onSubmit(item, navigate) {
		this.submitFunction(this.itemModel, navigate);
	}

	parseImage(event) {
		this.loadingImg = true;
		this.itemModel.file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (loadEvent) => {
			const img = <FileReader>loadEvent.target;
			const imgStr: string = <string>img.result;
			const extension = this.utils.getExtensionFromFilename(this.itemModel.file.name);
			// prevent from uploading non-image files
			const allowedExtensions = ['jpg', 'jpeg', 'png'];

			if (allowedExtensions.includes(extension.toLowerCase())) {
				this.attachment = 'data:image/' + extension + ';charset=utf-8;base64,' + btoa(imgStr);
				this.loadingImg = false;
			} else {
				this.notify.error('Error', 'Only JPG or PNG are allowed.');
				this.loadingImg = false;
			}
		};
		reader.readAsBinaryString(this.itemModel.file);
	}
}
