import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CryptoService {

	constructor() { }

	encrypt(value) {
		const key = CryptoJS.enc.Utf8.parse(environment.secret);
		const iv = CryptoJS.enc.Utf8.parse(environment.secret);

		const encSettings = {
			keySize: 128 / 8,
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		};

		const encrypted = CryptoJS.AES.encrypt(
			CryptoJS.enc.Utf8.parse(value.toString()), key, encSettings
		);

		return encrypted.toString();
	}

	decrypt(value) {
		const key = CryptoJS.enc.Utf8.parse(environment.secret);
		const iv = CryptoJS.enc.Utf8.parse(environment.secret);

		const encSettings = {
			keySize: 128 / 8,
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		};

		const decrypted = CryptoJS.AES.decrypt(value, key, encSettings);
		return decrypted.toString(CryptoJS.enc.Utf8);
	}
}
