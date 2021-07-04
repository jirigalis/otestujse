import { AuthGuard } from '../core/authentication/auth.guard';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { CategoryDashboardComponent } from './category-dashboard/category-dashboard.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { QuestionDashboardComponent } from './question-dashboard/question-dashboard.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { ItemDashboardComponent } from './item-dashboard/item-dashboard.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const adminRoutes = [
	{
		path: '', component: AdminComponent,
		children: [
			{ path: '', component: AdminHomeComponent },

			{ path: 'item', component: ItemDashboardComponent },
			{ path: 'add-item', component: AddItemComponent },
			{ path: 'edit-item/:id', component: EditItemComponent },

			{ path: 'category', component: CategoryDashboardComponent },
			{ path: 'add-category', component: AddCategoryComponent },
			{ path: 'edit-category/:id', component: EditCategoryComponent },

			{ path: 'question', component: QuestionDashboardComponent },
			{ path: 'add-question', component: AddQuestionComponent },
			{ path: 'edit-question/:id', component: EditQuestionComponent },

			{ path: 'user', component: UserDashboardComponent },
			{ path: 'add-user', component: AddUserComponent },
			{ path: 'edit-user/:id', component: EditUserComponent },
		],
		data: { adminOnly: true },
		canActivate: [AuthGuard]
	},
];
@NgModule({
	imports: [RouterModule.forChild(adminRoutes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
