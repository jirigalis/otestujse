import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ItemService } from '../../core/services/item.service';
import { Item } from '../../core/models/item.model';

@Component({
	selector: 'add-item',
	templateUrl: './add-item.component.html',
	styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
	newItem: Item = new Item(null, '');
	submitFunction = this.onSubmit;

	constructor(private itemService: ItemService
		, private notify: NotificationsService
		, private router: Router
	) { }

	ngOnInit(): void {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	onSubmit(item, navigate) {
		const formData = new FormData();
		formData.append('file', item.file);
		formData.append('item', JSON.stringify(item));

		this.itemService.create(formData).subscribe(
			res => {
				this.notify.success('Success', 'New Item has been added successfully');
				if (navigate) {
					this.router.navigate(['/admin/add-item']);
				} else {
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
