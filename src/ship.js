export default class Ship {
	constructor(length, x, y, rotation) {
		this.length = length || this._getRandomLength(5);
		this.hits = 0;
		this._coordList =
			typeof x === "number" &&
			typeof y === "number" &&
			typeof rotation === "number"
				? this.getShipCoords(
						this.length,
						[
							this._testPositiveIntOrZero(x),
							this._testPositiveIntOrZero(y),
						],
						this._testPositiveIntOrZero(rotation)
				  )
				: null;
	}

	getShipCoords(arglen, [argx, argy], argrotation) {
		if (this._coordList) return this._coordList;
		const [x, y] = [argx, argy] || [this.x, this.y];
		const rotation = argrotation || this.rotation;
		const coordList = [];
		const len = arglen || this.length;

		const isRotEven = rotation % 2 === 0;

		for (let i = 0; i < len; i++) {
			const newX = isRotEven ? x : rotation < 2 ? x + i : x - i;

			const newY = !isRotEven ? y : rotation < 2 ? y - i : y + i;
			coordList.push([newX, newY]);
		}
		this._coordList = coordList;
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

	_testPositiveIntOrZero(input) {
		const num = parseInt(input);
		if (num !== Number(num)) {
			throw new Error(
				"Wrong type or format (" + num + "), expected a positive int"
			);
		}
        return num
	}

	_testPositiveInt(input) {
		const num = parseInt(input);
		this._testPositiveIntOrZero(num);
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
