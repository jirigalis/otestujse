import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Item } from '../../core/models/item.model';
import { ItemService } from '../../core/services/item.service';

@Component({
	selector: 'edit-item',
	templateUrl: './edit-item.component.html',
	styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

	public item: Item = new Item(null, '');
	public submitFunction = this.onSubmit;

	constructor(
		private itemService: ItemService
		, private router: Router
		, private route: ActivatedRoute
		, private notify: NotificationsService
	) { }

	ngOnInit(): void {
		const itemId = this.route.snapshot.params.id;
		this.itemService.getItem(itemId).subscribe(
			res => {
				this.item = res;
			},
			err => {
				this.notify.error('Error', 'Error while loading item data!');
			}
		);
	}

	onSubmit(item, stay) {
		const formData = new FormData();
		formData.append('item', JSON.stringify(item));
		if (item.file) {
			formData.append('file', item.file);
		}

		this.itemService.update(item.id, formData).subscribe(
			res => {
				this.notify.success('Success', 'Changes have been successfully saved.');
				if (!stay) {
					this.router.navigate(['/admin/item']);
				}
			},
			err => {
				if (err === 'Conflict') {
					this.notify.error('Error', 'Položka s názvem \'' + item.name + '\' již existuje.');
				} else {
					this.notify.error('Error', 'Při vkládání došlo k neočekávené chybě.');
				}
			}
		);
	}

}
