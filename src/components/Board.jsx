import React from "react";
import Column from "./Column";
import { useState, useEffect } from "react";

const Board = ({ size: argSize, ships: argShips }) => {
	const [size, ships] = [argSize || 10, argShips || [2, 3, 3, 4, 5]];
	const board = _makeBoard(size)
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
	// useEffect(() => {}, [ships]);

	useEffect(() => {
		setContents(board);
	}, [...board]);

	const sendAttack = (e, x, y) => {
		console.log("Clickity Click! (" + x + ", " + y + ")");
	};
	function placeShip(index, [x, y], rotation) {
		//Check if the ship has been placed
		if (typeof ships[index] !== "number")
			throw new Error("Ship " + index + " already placed");

		const len = _testPositiveInt(ships[index]);
		const coords = Ship.getShipCoords(len, [x, y], rotation);

		coords.forEach(([x, y]) => {
			//Check if the coords are available
			if (board[x][y] !== null)
				throw new Error(
					"Tile " +
						x +
						", " +
						y +
						" already occupied (" +
						board[x][y] +
						")"
				);
			// console.log("placing " + x + ", " + y);
			board[x][y] = index; //`${index} : ${x}, ${y}`;
		});
		ships[index] = new Ship(len, x, y, rotation);
	}

    	function isAllSunk() {
		return ships
			.filter((ship) => typeof ship != "number")
			.every((ship) => ship.isSunk());
	}

	function attack([x, y]) {
		if (!board[x][y] || board[x][y] < 0) {
			board[x][y] = -1;
			return;
		}
		ships[board[x][y]].hit();
		board[x][y] = -2;
	}

	function _makeBoard(size) {
		size = _testPositiveInt(size);

		const arr = [...Array(size)].map((e) => Array(size).fill(null));
		//arr.forEach((col, y) => arr[y] = col.map((val, x) => col[x] = "" + x + ", " + y))
		return arr;
	}

	function _testPositiveInt(input) {
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
									i === 0 ? contents : board[i - 1]
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
