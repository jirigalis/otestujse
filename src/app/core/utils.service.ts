import { split, last } from 'lodash';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UtilsService {
	private typeCache: { [label: string]: boolean } = {};

	public type<T>(label: T | ''): T {
		if (this.typeCache[<string>label]) {
			throw new Error(`Action type "${label}" is not unique"`);
		}

		this.typeCache[<string>label] = true;

		return <T>label;
	}

	public getExtensionFromFilename(filename) {
		let extension = '';
		if (filename > '') {
			const parts = split(filename, '.');
			if (parts.length >= 2) {
				extension = last(parts);
			}
		}
		return extension;
	}

	public getFormData = object => Object.keys(object).reduce((formData, key) => {
		formData.append(key, object[key]);
		return formData;
	}, new FormData())
}
