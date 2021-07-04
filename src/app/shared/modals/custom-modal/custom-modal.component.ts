import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'custom-modal',
	templateUrl: './custom-modal.component.html',
	styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent implements OnInit {

	constructor(public activeModal: NgbActiveModal) {
	}

	@Input() modalHeader: string;
	@Input() content: string;
	@Input() confirmButtonText: string;
	@Input() confirmButtonIcon: string;

	ngOnInit() {
	}

}
