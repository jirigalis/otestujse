import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'multi-select',
	templateUrl: './multi-select.component.html',
	styleUrls: ['./multi-select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MultiSelectComponent),
			multi: true
		}
	]
})
export class MultiSelectComponent implements ControlValueAccessor {

	@Input() data = [];
	@Input() id_property_name: string;
	@Input() label_property_name: string;
	@Input() disabled = false;
	selectedData = [];

	onChange = (selectedData) => {}

	onTouched = () => {};

	get value() {
		return this.selectedData;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	writeValue(obj: any): void {
		this.selectedData = obj;
	}

}
