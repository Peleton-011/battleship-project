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
	const [ships, setShips] = useState(
		(argShips || [2, 3, 3, 4, 5]).map((ship) => new Ship(ship))
	);

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

	return (
		<div>
			<Player
				ships={ships}
                setShips={setShips}
				size={size}
				//
				board={board1}
				setBoard={setBoard1}
				enemyBoard={board2}
				setEnemyBoard={setBoard2}
				//
				active={currentBoard && !turnEnded}
				endTurn={endTurn}
				player={p1Name}
			/>
			<Player
				ships={ships}
                setShips={setShips}
				size={size}
				//
				board={board2}
				setBoard={setBoard2}
				enemyBoard={board1}
				setEnemyBoard={setBoard1}
				//
				active={!currentBoard && !turnEnded}
				endTurn={endTurn}
				player={p2Name}
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
