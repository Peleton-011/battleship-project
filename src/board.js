import Ship from "./ship";
export default class GameBoard {
	constructor(size, boatList) {
		this.board = this._makeBoard(size || 10);
		this.ships = boatList || [2, 3, 3, 4, 5];
	}

	get isReady() {
		return this.ships.every((ship) => !!ship.length);
	}

	placeShip(index, [x, y], rotation) {
		//Check if the ship has been placed
		if (typeof this.ships[index] !== "number")
			return new Error("Ship " + index + " already placed");

		const len = this._testPositiveInt(this.ships[index]);
		const coords = Ship.getShipCoords(len, [x, y], rotation);

		//TO-DO: Refactor these loops vvvv (?)

		//Check if the coords are available
		for (let i = 0; i < coords.length; i++) {
			const currentCoords = coords[i];
			if (this.board[currentCoords[0]][currentCoords[1]] !== null)
				return new Error(
					"Tile " +
						currentCoords[0] +
						", " +
						currentCoords[1] +
						" already occupied (" +
						this.board[currentCoords[0]][currentCoords[1]] +
						")"
				);
		}

		for (let i = 0; i < coords.length; i++) {
			const currentCoords = coords[i];
			this.board[currentCoords[0]][currentCoords[1]] = index;
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
