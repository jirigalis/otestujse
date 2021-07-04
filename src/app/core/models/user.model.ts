import { Deserializable } from '../deserializable.model';

export class User implements Deserializable {
	id: number;
	email: string;
	role: number;
	firstname?: string;
	lastname?: string;

	constructor(id: number, email: string, role: number, firstname?: string, lastname?: string) {
		this.id = id;
		this.firstname = firstname || '';
		this.lastname = lastname || '';
		this.email = email;
		this.role = role;
	}

	deserialize(input: any) {
		Object.assign(this, input);
		return this;
	}
}
