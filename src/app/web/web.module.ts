import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingComponent } from './training/training.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';

@NgModule({
	declarations: [
		HomeComponent,
		CategoryComponent,
		CategoryDetailComponent,
		TrainingComponent,
		ItemDetailComponent,
	],
	imports: [
		CommonModule,
		FontAwesomeModule,
		SharedModule
	]
})
export class WebModule {
}
