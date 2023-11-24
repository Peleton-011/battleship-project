import React from "react";
import Column from "./Column";
import { useState, useEffect } from "react";

const Board = (S) => {
	const board = new GameBoard();
	const len = 10;

	const emptyContent = [];
	for (let i = 0; i < len; i++) {
		const col = [];
		for (let j = 0; j < len; j++) {
			col.push([]);
		}
		emptyContent.push(col);
	}

	const [contents, setContents] = useState(emptyContent);
	const [onClick, setOnClick] = useState(() => {});
	//Upon placing a ship the onclick should change to place the next ship; once all ships have been placed it should be set to attack, and the board should update from that point onward toggling between perspectives to attack and watch the enemy's attacks
	// useEffect(() => {}, [board.ships]);

	useEffect(() => {
		setContents(board.board);
	}, [...board.board]);

	const sendAttack = (e, x, y) => {
		console.log("Clickity Click! (" + x + ", " + y + ")");
	};
	const placeShip = (e, x, y) => {};

	return (
		<div className="board-wrapper">
			<div className="board">
				{(() => {
					const cols = [];
					for (let i = 0; i < len + 1; i++) {
						cols.push(
							<Column
								key={i}
								col={i}
								len={len}
								contents={
									i === 0 ? contents : board.board[i - 1]
								}
								onclick={sendAttack}
							/>
						);
					}
					return cols;
				})()}
			</div>

			{/* <PotionBoard len={len} onblur={potionOnBlur} /> */}
		</div>
	);
};

class GameBoard {
	constructor(size, boatList) {
		this.board = this._makeBoard(size || 10);
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
			// console.log("placing " + x + ", " + y);
			this.board[x][y] = index; //`${index} : ${x}, ${y}`;
		});
        this.ships[index] = new Ship(len, x, y, rotation);
	}

	isAllSunk() {
		return this.ships
			.filter((ship) => typeof ship != "number")
			.every((ship) => ship.isSunk());
	}

	attack([x, y]) {
		if (!this.board[x][y] || this.board[x][y] < 0) {
			this.board[x][y] = -1;
			return;
		}
		this.ships[this.board[x][y]].hit();
			this.board[x][y] = -2;
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

class Ship {
	constructor(length, x, y, rotation) {
		this.length = length || this._getRandomLength(5);
		this.hits = 0;
		this.x = typeof x === "number" ? x : null;
		this.y = typeof y === "number" ? y : null;
		this.rotation = typeof rotation === "number" ? rotation : null;
		this._coordList =
			this.x !== null && this.x !== null && this.x !== null
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
		const len = arglen || this.length;
		const coordList = Ship.getShipCoords(len, [x, y], rotation);
		this._coordList = coordList;
		return coordList;
	}

	static getShipCoords(len, [x, y], rotation) {
		const coordList = [];

		const isRotEven = rotation % 2 === 0;

		for (let i = 0; i < len; i++) {
			const newX = isRotEven ? x : rotation < 2 ? x + i : x - i;

			const newY = !isRotEven ? y : rotation < 2 ? y - i : y + i;
			coordList.push([newX, newY]);
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

	_testPositiveIntOrZero(input) {
		const num = parseInt(input);
		if (num !== Number(num)) {
			throw new Error(
				"Wrong type or format (" + num + "), expected a positive int"
			);
		}
		return num;
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

export default Board;
