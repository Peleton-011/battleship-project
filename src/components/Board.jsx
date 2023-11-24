import React from "react";
import Column from "./Column";
import { useState, useEffect } from "react";

const Board = ({ size: argSize, ships: argShips }) => {
	const [size, ships] = [argSize || 10, argShips || [2, 3, 3, 4, 5]];
	const [board, setBoard] = useState(_makeBoard(size));
	const [onClick, setOnClick] = useState(() => {});
	//Upon placing a ship the onclick should change to place the next ship; once all ships have been placed it should be set to attack, and the board should update from that point onward toggling between perspectives to attack and watch the enemy's attacks
	// useEffect(() => {}, [ships]);

	const sendPlaceShip = (e, x, y) => {
		console.log("Clickity Click! (" + x + ", " + y + ")");
		let i = 0;

		const rect = e.target.getBoundingClientRect();
		const mousePos = {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
			relX: (e.clientX - rect.left) / rect.width,
			relY: (e.clientY - rect.top) / rect.height,
		};

		let rot = 0;
		//Select side based on mouse position (Up, down, left, right)
		if (
			mousePos.relX > mousePos.relY &&
			mousePos.relX < 1 - mousePos.relY
		) {
			rot = 0;
		} else if (
			mousePos.relX < mousePos.relY &&
			mousePos.relX < 1 - mousePos.relY
		) {
			rot = 3;
		} else if (
			mousePos.relX > mousePos.relY &&
			mousePos.relX > 1 - mousePos.relY
		) {
			rot = 1;
		} else if (
			mousePos.relX < mousePos.relY &&
			mousePos.relX > 1 - mousePos.relY
		) {
			rot = 2;
		}

		console.log(rot);

		console.log("Mouse position: " + mousePos.relX + "," + mousePos.relY);

		placeShip(i, [x - 1, y - 1], rot);
	};
	const sendAttack = (e, x, y) => {
		console.log("Clickity Click! (" + x + ", " + y + ")");
	};

	function placeShip(index, [x, y], rotation) {
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
			const tempBoard = [...board];
			tempBoard[x][y] = index;
			setBoard(tempBoard); //`${index} : ${x}, ${y}`;
		});
		ships[index] = new Ship(len, x, y, rotation);
	}
	function attack([x, y]) {
		if (!board[x][y] || board[x][y] < 0) {
			const tempBoard = board;
			tempBoard[x][y] = -1;
			setBoard(tempBoard);
			return;
		}
		ships[board[x][y]].hit();
		const tempBoard = board;
		tempBoard[x][y] = -2;
		setBoard(tempBoard);
	}

	function isAllSunk() {
		return ships
			.filter((ship) => typeof ship != "number")
			.every((ship) => ship.isSunk());
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
				<Column
					col={0}
					len={size}
					contents={board}
					onclick={sendPlaceShip}
				/>
				{board.map((col, i) => (
					<Column
						key={i + 1}
						col={i + 1}
						len={size}
						contents={board[i]}
						onclick={sendPlaceShip}
					/>
				))}
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
