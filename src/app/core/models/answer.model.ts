import { Deserializable } from '../deserializable.model';

export class Answer implements Deserializable {
	id: number;
	text: string;
	answers?: number[];

	constructor (id: number, text: string, answers?: number[]) {
		this.id = id;
		this.text = text;
		this.answers = answers || [];
	}

	deserialize(input: any) {
		Object.assign(this, input);
		return this;
	}
}
