import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../core/services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Question } from '../../core/models/question.model';
import { CategoryService } from '../../core/services/category.service';

@Component({
	selector: 'edit-question',
	templateUrl: './edit-question.component.html',
	styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

	public question: Question = new Question(null, '', 1);
	public submitFunction = this.onSubmit;

	constructor(
		private questionService: QuestionService,
		private categoryService: CategoryService,
		private router: Router,
		private route: ActivatedRoute,
		private notify: NotificationsService
	) {
		const questionId = this.route.snapshot.params.id;
		this.questionService.getQuestionWithCategories(questionId).subscribe(
			res => {
				if (res.attachment && !res.attachment.startsWith('data')) {
					res.attachment = 'data:image/jpg;charset=utf-8;base64,' + res.attachment;
				}
				this.question = res;
			},
			err => {
				this.notify.error('Error', 'Error while loading question detail!');
			}
		);
	}

	ngOnInit() {
	}

	onSubmit(question, stay) {
		console.log(question);
		this.questionService.update(question).subscribe(
			res => {
				this.notify.success('Success', 'Changes have been successfully saved.');
				if (!stay) {
					this.router.navigate(['/admin/question']);
				}
			},
			err => {
				this.notify.error('Error', 'Error during saving changes. Try again later.');
			}
		);
	}

}
