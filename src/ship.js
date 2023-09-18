export default class Ship {
	constructor(length) {
		this.length = length;
	}

	set length(len) {
		this._length = this._testPositiveInt(len);
	}
	get length() {
		return this._length;
	}

	_testPositiveInt(input) {
		const num = parseInt(input);
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
