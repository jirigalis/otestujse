import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './auth.interceptor';
import { CoreModule } from './core/core.module';
import { WebModule } from './web/web.module';
import { AuthGuard } from './core/authentication/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './error.interceptor';
import { CustomModalComponent } from './shared/modals/custom-modal/custom-modal.component';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MomentModule } from 'ngx-moment';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		DataTablesModule.forRoot(),
		FontAwesomeModule,
		FormsModule,
		HttpClientModule,
		NgbModule,
		SimpleNotificationsModule.forRoot(),
		CoreModule,
		SharedModule,
		WebModule,
		FontAwesomeModule,
		MomentModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true
		},
		AuthGuard
	],
	bootstrap: [AppComponent],
	entryComponents: [CustomModalComponent]
})
export class AppModule {
}
