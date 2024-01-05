// import GameBoard  "./board";false
import Player from "./components/Player";
import NextTurn from "./components/NextTurn";
import Ship from "./Ship";
import { useState, useRef } from "react";

const GameLoop = ({ isSinglePlayer, argSize, argShips }) => {
	const p1Name = "Player 1";
	const p2Name = "Player 2";

	const [currentBoard, setCurrentBoard] = useState(false);
	const [turnEnded, setTurnEnded] = useState(false);

	const [size, setSize] = useState(argSize || 10);
	const [ships1, setShips1] = useState(
		(argShips || [2, 3, 3, 4, 5]).map((ship) => new Ship(ship))
	);
	const [ships2, setShips2] = useState(
		(argShips || [2, 3, 3, 4, 5]).map((ship) => new Ship(ship))
	);

	const [shipsPlaced, setShipsPlaced] = useState([false, false]);

	const [board1, setBoard1] = useState(_makeBoard(size));
	const [board2, setBoard2] = useState(_makeBoard(size));

	const changeTurn = () => {
		setTurnEnded(false);
		setCurrentBoard(!currentBoard);
		console.log("Chnage turn");
	};

	const endTurn = () => {
		setTurnEnded(true);
		console.log("end turn");
	};

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

	////////////////////////////////////////////////////////////////////////////////////
	const getPlaceShip = (
		board,
		setBoard,
		ships,
		setShips,
		shipsPlacedIndex
	) => {
		return (e, [x, y]) => {
			if (shipsPlaced[shipsPlacedIndex]) return;
			const index = getNextIndex(ships);
			console.log("Clickity Click! (" + x + ", " + y + ")");

			const rot = getRotation(getMousePos(e));

			// console.log("Mouse position: " + mousePos.relX + "," + mousePos.relY);

			const len = _testPositiveInt(ships[index].length);
			const coords = Ship.getShipCoords(len, [x - 1, y - 1], rot);

			coords.forEach(([currx, curry]) => {
				//Check if the coords are available
				if (board[currx][curry] !== null)
					throw new Error(
						"Tile " +
							currx +
							", " +
							curry +
							" already occupied (" +
							board[currx][curry] +
							")"
					);
				// console.log("placing " + x + ", " + y);
				setBoard(updateBoard(index, [currx, curry], board));
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

			if (index === ships.length - 1) {
				console.log("ending turn");
				setShipsPlaced({ ...shipsPlaced, [shipsPlacedIndex]: true });
				endTurn();
			}
		};
	};

	function getAttack(board, setBoard, ships) {
		return (e, coords) => {
			const [x, y] = coords.map((coord) => coord - 1);
			console.log("attacking " + x + ", " + y + ": " + board[x][y]);
			if (board[x][y] < 0) {
				return;
			}
			if (typeof board[x][y] !== "number") {
				setBoard(updateBoard(-1, [x, y], board));
				return;
			}
			ships[board[x][y]].hit();
			setBoard(updateBoard(-2, [x, y], board));
			if (isAllSunk(ships)) {
				console.log("you win");
			}
			endTurn();
		};
	}

	const onAttack = (e, x, y) => {
		if (!enemyBoard[x][y]) {
			const res = attackEnemy(e, x, y);

			setEnemyBoard(updateBoard(res, [x, y], enemyBoard));
		}
	};
	///////////////////////////////////////////////////////////////////////////

	const getNextIndex = (board, ships) => {
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

	function getRotation(mousePosition) {
		//Select side based on mouse position (Up, down, left, right)
		if (
			mousePosition.relX > mousePosition.relY &&
			mousePosition.relX < 1 - mousePosition.relY
		) {
			return 0;
		} else if (
			mousePosition.relX < mousePosition.relY &&
			mousePosition.relX < 1 - mousePosition.relY
		) {
			return 3;
		} else if (
			mousePosition.relX > mousePosition.relY &&
			mousePosition.relX > 1 - mousePosition.relY
		) {
			return 1;
		} else if (
			mousePosition.relX < mousePosition.relY &&
			mousePosition.relX > 1 - mousePosition.relY
		) {
			return 2;
		}
	}

	function getMousePos(e) {
		const rect = e.target.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
			relX: (e.clientX - rect.left) / rect.width,
			relY: (e.clientY - rect.top) / rect.height,
		};
	}

	function isAllSunk(ships) {
		return ships
			.filter((ship) => typeof ship != "number")
			.every((ship) => ship.isSunk());
	}

	function updateBoard(newVal, [x, y], board) {
		const newBoard = [...board];
		newBoard[x][y] = newVal;
		return newBoard;
	}

	return (
		<div>
			<Player
				nextIndex={getNextIndex(board1, ships1)}
				size={size}
				//
				board={board1}
				enemyBoard={board2}
				//
				active={currentBoard && !turnEnded}
				player={p1Name}
				//
				placeShip={getPlaceShip(board1, setBoard1, ships1, setShips1)}
				attack={getAttack(board2, setBoard2, ships2)}
				shipsPlaced={shipsPlaced}
			/>
			<Player
				nextIndex={getNextIndex(board2, ships2)}
				size={size}
				//
				board={board2}
				enemyBoard={board1}
				//
				active={!currentBoard && !turnEnded}
				player={p2Name}
				//
				placeShip={getPlaceShip(board2, setBoard2, ships2, setShips2)}
				attack={getAttack(board1, setBoard1, ships1)}
				shipsPlaced={shipsPlaced}
			/>
			{!isSinglePlayer && (
				<NextTurn
					active={turnEnded}
					player={currentBoard ? p1Name : p2Name}
					nextTurn={() => changeTurn()}
				/>
			)}
		</div>
	);
};

export default GameLoop;
