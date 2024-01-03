// import GameBoard  "./board";false
import Board from "./components/Board";
import NextTurn from "./components/NextTurn";
import { useState } from "react";

const GameLoop = ({ isSinglePlayer }) => {
	const [currentBoard, setCurrentBoard] = useState(false);
	const [turnEnded, setTurnEnded] = useState(false);

	const changeTurn = () => {
		setTurnEnded(false);
		setCurrentBoard(!currentBoard);
		console.log("Chnage turn");
	};

	const endTurn = () => {
		setTurnEnded(true);
		console.log("end turn");
	};

	return (
		<div>
			<Board active={currentBoard && !turnEnded} endTurn={endTurn} />
			<Board active={!currentBoard && !turnEnded} endTurn={endTurn} />
			{!isSinglePlayer && (
				<NextTurn
					active={turnEnded}
					player={currentBoard ? "Player 1" : "Player 2"}
					nextTurn={() => changeTurn()}
				/>
			)}
		</div>
	);
};

export default GameLoop;
