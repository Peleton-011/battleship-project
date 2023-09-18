export default class Ship {
	constructor(length) {
		this.length = length;
	}

	set length(len) {
		const newLen = parseInt(len);

		this._length = this._testPositiveInt(newLen);
	}
	get length() {
		return this._length;
	}

	_testPositiveInt(num) {
		if (num !== Number(num)) {
			throw new Error(
				"Wrong type or format (" + num + "), expected a positive int"
			);
		}
		if (num < 1) {
			throw new Error(
				"Wrong type or format (" + num + "), expected a positive int"
			);
		}
		return num;
	}
}
