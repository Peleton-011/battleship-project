export default class Ship {
	constructor(length) {
		this.length = length;
	}

	set length(len) {
		const newLen = parseInt(len);
		if (newLen !== Number(len)) {
			throw new Error(
				"Wrong type or format (" + len + "), expected a positive int"
			);
		}
		if (newLen < 1) {
			throw new Error(
				"Wrong type or format (" + len + "), expected a positive int"
			);
		}
		this._length = newLen;
	}
	get length() {
		return this._length;
	}
}
