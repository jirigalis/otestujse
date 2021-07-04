import {Component, AfterViewInit} from '@angular/core';
import * as AOS from 'aos';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
	title = 'Otestuj se';

	notifyOptions = {
		clickIconToClose: true,
		showProgressBar: true,
		timeOut: 4000
	};

	ngAfterViewInit() {
		AOS.init();
	}
}
