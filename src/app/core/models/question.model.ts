export class Question {
	id: number;
	text: string;
	level: number;
	attachment: string;
	status: number;

	constructor(id: number, text: string, level: number, attachment?: string, status?: number) {
		this.id = id;
		this.text = text;
		this.level = level;
		this.attachment = attachment || '';
		this.status = status || 1;
	}
}
