import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import GameBoard from "./board";
import GameLoop from "./GameLoop";

function App() {
	const [count, setCount] = useState(0);

	return (
		<main>
			<GameLoop />
		</main>
	);
}

export default App;
