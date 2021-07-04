import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ItemService } from '../../core/services/item.service';
import { ModalService } from '../../core/modal.service';
import { DataTableDirective } from 'angular-datatables';
import { Item } from '../../core/models/item.model';
import { Subject } from 'rxjs/internal/Subject';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'item-dashboard',
	templateUrl: './item-dashboard.component.html',
	styleUrls: ['./item-dashboard.component.scss']
})
export class ItemDashboardComponent implements OnInit, OnDestroy {

	constructor(
		public DomSanitizerService: DomSanitizer
		, private modalService: ModalService
		, private router: Router
		, private itemService: ItemService
		, private notify: NotificationsService
	) { }

	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;

	public items: Item[] = [];
	public dtOptions: DataTables.Settings = {};
	public dtTrigger: Subject<any> = new Subject();
	public modal: NgbModalRef;

	ngOnInit(): void {
		this.dtOptions = {
			pagingType: 'full_numbers'
		};

		this.itemService.getAll()
			.subscribe(
				res => {
					this.items = res;
					this.dtTrigger.next();
				},
				err => {
					this.notify.error('Error', 'Error during fetching data from server');
				}
			);
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}

	deleteItem(itemId) {
		this.modalService.openDeleteModal('Item').result.then(result => {
			this.itemService.delete(itemId).subscribe(
				res => {
					this.notify.success('Success', 'The item was successfully deleted');
					const index = this.items.map(q => q.id).indexOf(itemId);
					if (index > -1) {
						this.items.splice(index, 1);
					}
				},
				err => {
					this.notify.error('Error', 'Error during deleting the item.');
				}
			);
		}, reason => { }
		);
	}

	editItem(itemId) {
		this.router.navigate(['/admin/edit-item/' + itemId]);
	}
}
