import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import GameBoard from "./board";
import GameLoop from "./battleship";

function App() {
	const [count, setCount] = useState(0);
	const loop = new GameLoop();

	const board1 = loop.board1;
	const board2 = loop.board2;

    loop.start()

	board1.placeShip(2, [1, 3], 1);
	board1.attack([1, 1]);
	board1.attack([3, 3]);

	console.log(board1.ships);

	console.log(board1.isAllSunk() + " finale");

	return (
		<main>
			<Board board={board1} />
		</main>
	);
}

export default App;
