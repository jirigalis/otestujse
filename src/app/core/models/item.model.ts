export class Item {
	id: number;
	name: string;
	latin_name: string;
	level: number;
	description: string;
	file: File;
	categories;
	attachmentPath;
	filename;

	constructor(id: number, name: string, latin_name?: string, level?: number, description?: string, file?: File, filename?: String) {
		this.id = id;
		this.name = name;
		this.latin_name = latin_name || '';
		this.level = level || 1;
		this.description = description || '';
		this.file = file || null;
		this.filename = filename || null;
	}
}
