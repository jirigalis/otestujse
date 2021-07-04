import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin/admin.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CategoryDashboardComponent } from './category-dashboard/category-dashboard.component';
import { DataTablesModule } from 'angular-datatables';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { QuestionDashboardComponent } from './question-dashboard/question-dashboard.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MomentModule } from 'ngx-moment';
import { ItemDashboardComponent } from './item-dashboard/item-dashboard.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
	declarations: [
		AdminHomeComponent,
		AdminComponent,
		SideNavComponent,
		CategoryDashboardComponent,
		AddCategoryComponent,
		CategoryFormComponent,
		EditCategoryComponent,
		QuestionDashboardComponent,
		EditQuestionComponent,
		AddQuestionComponent,
		QuestionFormComponent,
		ItemDashboardComponent,
		ItemFormComponent,
		AddItemComponent,
		EditItemComponent,
		UserDashboardComponent,
		AddUserComponent,
		UserFormComponent,
		EditUserComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		AdminRoutingModule,
		DataTablesModule.forRoot(),
		FontAwesomeModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		NgSelectModule,
		MomentModule
	]
})
export class AdminModule {
}
