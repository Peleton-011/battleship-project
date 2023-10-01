import Ship from "./ship";
export default class GameBoard {
	constructor(size, boatList) {
		this.board = this._makeBoard(size || 10);
		this.ships = boatList || [2, 3, 3, 4, 5];
	}

	_setShipCoords(ship) {
		const coords = ship.getShipCoords();

		for (let i = 0; i < coords.length; i++) {
			const currentCoords = coords[i];
			this.board[currentCoords[0]][currentCoords[1]] = ship;
		}
	}

	get isReady() {
		return this.ships.every((ship) => !!ship.length);
	}

	placeShip(index, [x, y], rotation) {
		const len = this._testPositiveInt(this.ships[index]);
		this.ships[index] = new Ship(len, x, y, rotation);
		this._setShipCoords(this.ships[index]);
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
