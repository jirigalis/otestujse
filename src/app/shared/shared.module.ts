import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CustomModalComponent } from './modals/custom-modal/custom-modal.component';
import { MultiSelectComponent } from './multiselect/multi-select.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ImagePipe } from './pipes/image.pipe';
import { MustMatchDirective } from './directives/must-match/must-match.directive';
import { CategoryThumbnailComponent } from './components/category-thumbnail/category-thumbnail.component';
import { ItemThumbnailComponent } from './components/item-thumbnail/item-thumbnail.component';
import { ItemImageComponent } from './components/item-image/item-image.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgSelectModule,
		FontAwesomeModule,
	],
	declarations: [
		CustomModalComponent
		, CategoryThumbnailComponent
		, MultiSelectComponent
		, ImagePipe
		, MustMatchDirective
		, CategoryThumbnailComponent
		, ItemThumbnailComponent, ItemImageComponent
	],
	exports: [
		CustomModalComponent
		, CategoryThumbnailComponent
		, MultiSelectComponent
		, ImagePipe
		, MustMatchDirective
		, ItemThumbnailComponent
	]
})
export class SharedModule {
	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas);
	}
}
