import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import GameBoard from "./board";

function App() {
	const [count, setCount] = useState(0);

    const board1 = new GameBoard()
    const board2 = new GameBoard()

	return (
    <main>
        <Board contents={board1.board}/>
    </main>
    );
}

export default App;
