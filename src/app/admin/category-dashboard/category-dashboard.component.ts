import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Subject } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Category } from '../../core/models/category.model';

import { ModalService } from '../../core/modal.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { NotificationsService } from 'angular2-notifications';
import { DataTableDirective } from 'angular-datatables';

@Component({
	selector: 'category-dashboard',
	templateUrl: './category-dashboard.component.html',
	styleUrls: ['./category-dashboard.component.scss']
})
export class CategoryDashboardComponent implements OnInit, OnDestroy {

	constructor(
		public DomSanitizerService: DomSanitizer
		, private modalService: ModalService
		, private router: Router
		, private categoryService: CategoryService
		, private notify: NotificationsService
	) {
	}

	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;

	public categories: Category[] = [];
	public dtOptions: DataTables.Settings = {};
	public dtTrigger: Subject<any> = new Subject();
	public modal: NgbModalRef;

	ngOnInit() {
		this.dtOptions = {
			pagingType: 'full_numbers'
		};

		this.categoryService.getCategoriesWithStats()
			.subscribe(
				res => {
					this.categories = res;
					this.dtTrigger.next();
				},
				err => {
					this.notify.error('Error', 'Error during fetching data from server');
				}
			);
	}

	ngOnDestroy() {
		this.dtTrigger.unsubscribe();
	}

	deleteCategory(categoryId) {
		this.modalService.openDeleteModal('Category').result.then(result => {
			this.categoryService.delete(categoryId).subscribe(
				res => {
					this.notify.success('Success', 'The category was successfully deleted.');
					const index = this.categories.map(q => q.id).indexOf(categoryId);
					if (index > -1) {
						this.categories.splice(index, 1);
					}
				},
				err => {
					this.notify.error('Error', 'Error during deleting the category.');
				}
			);
		}, reason => {
			console.log(reason);
		});
	}

	disableCategory(categoryId) {
		this.modalService.openConfirmModal('Do you really want to disable this Category?').result.then(result => {
			this.categoryService.setCategoryStatus(categoryId, 2).subscribe(
				res => {
					const index = this.categories.map(t => t.id).indexOf(categoryId);
					this.categories[index].status = 2;
					this.notify.success('Success', 'The category has been disabled.');
				},
				err => {
					this.notify.error('Error', 'Error during disabling the category.');
				}
			);
		}, reason => { }
		);
	}

	enableCategory(categoryId) {
		this.modalService.openConfirmModal('Do you really want to enable this Category?').result.then(result => {
			this.categoryService.setCategoryStatus(categoryId, 1).subscribe(
				res => {
					const index = this.categories.map(t => t.id).indexOf(categoryId);
					this.categories[index].status = 1;
					this.notify.success('Success', 'The category has been enabled.');
				},
				err => {
					this.notify.error('Error', 'Error during enabling the category.');
				}
			);
		}, reason => {
		}
		);
	}

	editCategory(categoryId) {
		this.router.navigate(['/admin/edit-category/' + categoryId]);
	}
}
