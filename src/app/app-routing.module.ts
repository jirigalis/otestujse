import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/authentication/auth.guard';
import { HomeComponent } from './web/home/home.component';
import { SignupComponent } from './core/authentication/signup/signup.component';
import { LoginComponent } from './core/authentication/login/login.component';
import { CategoryComponent } from './web/category/category.component';
import { CategoryDetailComponent } from './web/category-detail/category-detail.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },

	{ path: 'login', component: LoginComponent, pathMatch: 'full' },
	{ path: 'signup', component: SignupComponent, pathMatch: 'full' },

	{ path: 'categories', component: CategoryComponent, pathMatch: 'full' },
	{ path: 'categories/:id', component: CategoryDetailComponent },

	{
		path: 'admin',
		loadChildren: './admin/admin.module#AdminModule'
	},

	{ path: '**', redirectTo: '/' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule],
	declarations: []
})
export class AppRoutingModule {
}
