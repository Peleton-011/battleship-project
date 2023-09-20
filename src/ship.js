export default class Ship {
	constructor(length, x, y, rotation) {
		this.length = length || this._getRandomLength(5);
		this.hits = 0;
		this._coordList = this._getShipCoords(
			this.length,
			[this._testPositiveInt(x), this._testPositiveInt(y)],
			this._testPositiveInt(rotation)
		) || null;
	}

	_getShipCoords(len, [x, y], rotation) {
		const coordList = [[x, y]];

		for (let i = 0; i < len - 1; i++) {
			const last = coordList[coordList.length - 1];
			coordList.push([
				rotation % 2 === 0
					? last[0]
					: rotation < 2
					? last[0] + 1
					: last[0] - 1,
				rotation % 2 === 1
					? last[1]
					: rotation < 2
					? last[1] - 1
					: last[1] + 1,
			]);
		}
		return coordList;
	}

	isSunk() {
		return this.hits >= this.length;
	}

	hit() {
		this.hits += 1;
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
	_getRandomLength(max) {
		return Math.floor(Math.random() * max) + 1;
	}
}
