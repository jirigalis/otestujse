export class Category {
	id: number;
	name: string;
	description: string;
	img: string;
	status: number;

	constructor(id: number, name: string, description?: string, img?: string, status?: number) {
		this.id = id;
		this.name = name;
		this.description = description || '';
		this.img = img || '';
		this.status = status || 1;
	}
}
