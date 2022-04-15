import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Item } from "../../../core/models/item.model";
import { ItemService } from "../../../core/services/item.service";

@Component({
	selector: "item-detail",
	templateUrl: "./item-detail.component.html",
	styleUrls: ["./item-detail.component.css"],
})
export class ItemDetailComponent implements OnInit {
	item: Item;
	constructor(
		private itemService: ItemService,
		private route: ActivatedRoute,
		private location: Location,
		public DomSanitizerService: DomSanitizer
	) {}

	ngOnInit(): void {
		const itemId = this.route.snapshot.params.id;
		this.itemService.getItem(itemId).subscribe((item) => {
			this.item = item;
		});
	}

	backToCategory() {
		this.location.back();
	}
}
