import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { CustomModalComponent } from '../shared/modals/custom-modal/custom-modal.component';

@Injectable({
	providedIn: 'root'
})
export class ModalService {

	constructor(private modalService: NgbModal) {
	}

	openCustomModal(modalComponent) {
		return this.modalService.open(modalComponent);
	}

	openModal(heading, content, confirmButtonText, confirmButtonIcon) {
		const activeModal = this.modalService.open(CustomModalComponent);
		activeModal.componentInstance.modalHeader = heading;
		activeModal.componentInstance.content = content;
		activeModal.componentInstance.confirmButtonText = confirmButtonText;
		activeModal.componentInstance.confirmButtonIcon = confirmButtonIcon;
		return activeModal;
	}

	openConfirmModal(question) {
		return this.openModal('Confirm action', question, 'Confirm', 'check');
	}

	openDeleteModal(itemName) {
		return this.openModal('Confirm action', 'Do you really want to delete this ' + itemName + '?', 'Delete', 'trash');
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);

			return of(result as T);
		};
	}
}
