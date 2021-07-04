import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../core/models/question.model';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService } from 'angular2-notifications';
import { UtilsService } from '../../core/utils.service';
import { CategoryService } from '../../core/services/category.service';
import { QuestionService } from '../../core/services/question.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Answer } from '../../core/models/answer.model';
import { AnswerService } from '../../core/services/answer.service';

@Component({
	selector: 'question-form',
	templateUrl: './question-form.component.html',
	styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

	public questionModel: Question;
	private loadingImg = false;
	public allCategories = [];
	@Input() submitFunction;
	private showSaveNewButton = false;
	private showNewAnswerForm = false;
	private answers$: Observable<Answer[]>;

	constructor(
		private DomSanitizerService: DomSanitizer,
		private notify: NotificationsService,
		private utils: UtilsService,
		private categoryService: CategoryService,
		private questionService: QuestionService,
		private answerService: AnswerService,
		private router: Router
	) {
		this.categoryService.getCategoriesList().subscribe(
			res => {
				this.allCategories = res;
			}
		);

		if (this.router.url === '/admin/add-question') {
			this.showSaveNewButton = true;
		}
	}

	ngOnInit() {
		this.answers$ = this.answerService.getAll();
	}

	@Input()
	set question(question: Question) {
		this.questionModel = question;
	}

	showNewAnswerFormFunc(show) {
		this.showNewAnswerForm = show;
	}

	onSubmit(question, navigate) {
		this.submitFunction(this.questionModel, navigate);
	}

	parseImage(event) {
		this.loadingImg = true;
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (loadEvent) => {
			const img = <FileReader>loadEvent.target;
			const imgStr: string = <string>img.result;
			const extension = this.utils.getExtensionFromFilename(file.name);
			// prevent from uploading non-image files
			const allowedExtensions = ['jpg', 'jpeg', 'png'];

			if (allowedExtensions.includes(extension.toLowerCase())) {
				this.questionModel.attachment = 'data:image/' + extension + ';charset=utf-8;base64,' + btoa(imgStr);
				this.loadingImg = false;
			} else {
				this.notify.error('Error', 'Only JPG or PNG are allowed.');
				this.loadingImg = false;
			}
		};

		reader.readAsBinaryString(file);
	}

}
