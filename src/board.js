import Ship from "./ship";
export default class GameBoard {
	constructor(size, boatList) {
		this.board = this._makeBoard(size || 10);
		console.log(this.board);
		this.ships = boatList || [2, 3, 3, 4, 5];
	}

	get isReady() {
		return this.ships.every((ship) => !!ship.length);
	}

	/**
	 * Places a ship on the game board.
	 *
	 * @param {number} index - The index of the ship to be placed.
	 * @param {array} [x, y] - The coordinates where the ship will be placed.
	 * @param {number} rotation - The rotation of the ship.
	 * @throws {Error} If the ship has already been placed.
	 * @throws {Error} If the coordinates are already occupied.
	 */
	placeShip(index, [x, y], rotation) {
		//Check if the ship has been placed
		if (typeof this.ships[index] !== "number")
			throw new Error("Ship " + index + " already placed");

		const len = this._testPositiveInt(this.ships[index]);
		const coords = Ship.getShipCoords(len, [x, y], rotation);

		coords.forEach(([x, y]) => {
			//Check if the coords are available
			if (this.board[x][y] !== null)
				throw new Error(
					"Tile " +
						x +
						", " +
						y +
						" already occupied (" +
						this.board[x][y] +
						")"
				);
			console.log("placing " + x + ", " + y);
			this.board[x][y] = `${index} : ${x}, ${y}`;
		});
		console.log(this.board);
		// throw new Error(this.board)
	}

	_makeBoard(size) {
		size = this._testPositiveInt(size);

		const arr = [...Array(size)].map((e) => Array(size).fill(null));
		//arr.forEach((col, y) => arr[y] = col.map((val, x) => col[x] = "" + x + ", " + y))
		return arr;
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
