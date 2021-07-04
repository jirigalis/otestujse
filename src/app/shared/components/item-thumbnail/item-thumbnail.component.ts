import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../../core/models/item.model';

@Component({
	selector: 'item-thumbnail',
	templateUrl: './item-thumbnail.component.html',
	styleUrls: ['./item-thumbnail.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemThumbnailComponent implements OnInit {

	@Input() item: Item;

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	openItemDetail(id) {
		this.router.navigate(["/item/" + id]);
	}

}
