import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalService } from '../../core/modal.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { QuestionService } from '../../core/services/question.service';
import { DataTableDirective } from 'angular-datatables';
import { Question } from '../../core/models/question.model';
import { Subject } from 'rxjs/internal/Subject';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { findIndex } from 'lodash';

@Component({
	selector: 'question-dashboard',
	templateUrl: './question-dashboard.component.html',
	styleUrls: ['./question-dashboard.component.scss']
})
export class QuestionDashboardComponent implements OnInit, OnDestroy {

	constructor(
		public DomSanitizerService: DomSanitizer
		, private modalService: ModalService
		, private router: Router
		, private questionService: QuestionService
		, private notify: NotificationsService
	) {
	}

	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;

	public questions: Question[] = [];
	public dtOptions: DataTables.Settings = {};
	public dtTrigger: Subject<any> = new Subject();
	public modal: NgbModalRef;

	ngOnInit() {
		this.dtOptions = {
			pagingType: 'full_numbers'
		};

		this.questionService.getQuestions()
			.subscribe(
				res => {
					this.questions = res;
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

	deleteQuestion(questionId) {
		this.modalService.openDeleteModal('Question').result.then(result => {
			this.questionService.delete(questionId).subscribe(
				res => {
					this.notify.success('Success', 'The question was successfully deleted.');
					const index = this.questions.map(q => q.id).indexOf(questionId);
					if (index > -1) {
						this.questions.splice(index, 1);
					}
				},
				err => {
					this.notify.error('Error', 'Error during deleting the category.');
				}
			);
		}, reason => { }
		);
	}

	disableQuestion(questionId) {
		this.modalService.openConfirmModal('Do you really want to disable this Question?').result.then(result => {
			this.questionService.setQuestionStatus(questionId, 2).subscribe(
				res => {
					const index = findIndex(this.questions, q => q.id === questionId);
					this.questions[index].status = 2;
					this.notify.success('Success', 'The question has been disabled');
				},
				err => {
					this.notify.error('Error', 'Error during disabling the question');
				}
			);
		}, reason => { }
		);
	}

	enableQuestion(questionId) {
		this.modalService.openConfirmModal('Do you really want to enable this Question?').result.then(result => {
			this.questionService.setQuestionStatus(questionId, 1).subscribe(
				res => {
					const index = findIndex(this.questions, t => t.id === questionId);
					this.questions[index].status = 1;
					this.notify.success('Success', 'The question has been enabled.');
				},
				err => {
					this.notify.error('Error', 'Error during enabling the question.');
				}
			);
		}, reason => {
		}
		);
	}

	editQuestion(questionId) {
		this.router.navigate(['/admin/edit-question/' + questionId]);
	}

}
