import React from "react";
import Board from "./Board";
import Ship from "../Ship";
import { useState, useEffect, useImperativeHandle } from "react";

const Player = ({
	board,
	setBoard,
	enemyBoard,
	setEnemyBoard,
	size,
	ships,
	setShips,
	active,
	endTurn,
	player,
	attackEnemy,
	ref,
}) => {
	const [shipsPlaced, setShipsPlaced] = useState(false);

	const onAttack = (e, x, y) => {
		if (!enemyBoard[x][y]) {
			const res = attackEnemy(e, x, y);

			setEnemyBoard(updateBoard(res, [x, y]));
		}
	};

	function updateBoard(newVal, [x, y]) {
		const newBoard = [...board];
		newBoard[x][y] = newVal;
		return newBoard;
	}

	const getNextIndex = () => {
		const i = ships.indexOf(
			ships.filter(
				(ship) =>
					!board.some((col) => col.includes(ships.indexOf(ship))) &&
					!ship.isSunk()
			)[0]
		);
		console.log(i);
		return i;
	};
	const sendPlaceShip = (e, x, y, i) => {
		console.log("Clickity Click! (" + x + ", " + y + ")");

		console.log(ships);
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

		// console.log("Mouse position: " + mousePos.relX + "," + mousePos.relY);

		placeShip(i, [x - 1, y - 1], rot);
		if (i === ships.length - 1) {
			console.log("ending turn");
			setShipsPlaced(true);
			endTurn();
		}
	};
	const sendAttack = (e, x, y) => {
		attack([x - 1, y - 1]);
		endTurn();
	};

	function placeShip(index, [x, y], rotation) {
		const len = _testPositiveInt(ships[index].length);
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
			setBoard(updateBoard(index, [x, y]));
		});
		console.log("about to new ship this bith");
		setShips(
			ships.map((ship, i) => {
				if (i === index) {
					return new Ship(len, x, y, rotation);
				}
				return ship;
			})
		);
	}
	function attack([x, y]) {
		console.log("attacking " + x + ", " + y + ": " + board[x][y]);
		if (board[x][y] < 0) {
			return;
		}
		if (typeof board[x][y] !== "number") {
			setBoard(updateBoard(-1, [x, y]));
			return;
		}
		ships[board[x][y]].hit();
		setBoard(updateBoard(-2, [x, y]));
		if (isAllSunk()) {
			console.log("you win");
		}
	}

	const onClick = (e, x, y) => {
		if (shipsPlaced === false) {
			const i = getNextIndex();
			if (i === -1) {
				return sendAttack(e, x, y);
			}
			return ((e, x, y) => sendPlaceShip(e, x, y, i))(e, x, y);
		}
		return sendAttack(e, x, y);
	};

	function isAllSunk() {
		return ships
			.filter((ship) => typeof ship != "number")
			.every((ship) => ship.isSunk());
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

	useImperativeHandle(ref, () => ({
		sendAttack: sendAttack,
	}));

	return (
		<div className={"board-wrapper" + (active ? " active" : "")}>
			<h2>
				{player}, {getNextIndex() >= 0 ? "place your ships" : "attack"}
			</h2>
			<Board
				board={board}
				onClick={onClick}
				size={size}
				isSmall={shipsPlaced}
			/>
			{shipsPlaced && (
				<Board
					isSmall={!shipsPlaced}
					board={enemyBoard}
					onClick={onAttack}
					size={size}
				/>
			)}
		</div>
	);
};

export default Player;
