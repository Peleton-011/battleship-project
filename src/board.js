import Ship from "./ship";
export default class GameBoard {
	constructor(size, boatList) {
		this.board = this._makeBoard(size || 10);
		this.ships = boatList || [2, 3, 3, 4, 5];
	}

	get isReady() {
		return this.ships.every((ship) => !!ship.length);
	}

	placeShip(len, x, y, rotation) {
		len = this._testPositiveInt(len);
		const index = this._testPositiveInt(this.ships.find((a) => a === len));
		this.ships[index] = new Ship(len, x, y, rotation);
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
	}
	_makeBoard(size) {
		size = this._testPositiveInt(size);
		return new Array(size).fill(new Array(size).fill(null));
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
