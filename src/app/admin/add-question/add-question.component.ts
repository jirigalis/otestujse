import { Component, OnInit } from '@angular/core';
import { Question } from '../../core/models/question.model';
import { QuestionService } from '../../core/services/question.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
	selector: 'add-question',
	templateUrl: './add-question.component.html',
	styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

	private newQuestion: Question = new Question(null, '', 1);
	private submitFunction = this.onSubmit;

	constructor(
		private questionService: QuestionService,
		private notify: NotificationsService,
		private router: Router
	) { }

	ngOnInit() {
	}

	onSubmit(question, navigate) {
		this.questionService.create(question).subscribe(
			res => {
				this.notify.success('Success', 'New question has been successfully created.');
				if (navigate) {
					this.router.navigate(['/admin/add-question']);
				} else {
					this.newQuestion = new Question(null, '', 1);
					this.router.navigate(['/admin/question']);
				}
			}
		);
	}

}
