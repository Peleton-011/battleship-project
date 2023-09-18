export default class Ship {
	constructor(length) {
		this.length = length;
	}

	set length(len) {
		const newLen = parseInt(len);
		if (newLen !== Number(len)) {
			throw new Error(
				"Ship length of wrong type or in wrong format (" + len + ")"
			);
		}
		this._length = newLen;
	}
	get length() {
		return this._length;
	}
}
