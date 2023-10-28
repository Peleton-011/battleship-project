import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import GameBoard from "./board";

function App() {
	const [count, setCount] = useState(0);

    const board1 = new GameBoard()
    const board2 = new GameBoard()

    board1.placeShip(2, [3, 3], 1)

	return (
    <main>
        <Board board={board1}/>
    </main>
    );
}

export default App;
