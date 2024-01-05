// import GameBoard  "./board";false
import Player from "./components/Player";
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

	const p1Name = "Player 1";
	const p2Name = "Player 2";

	return (
		<div>
			<Player
				active={currentBoard && !turnEnded}
				endTurn={endTurn}
				player={p1Name}
			/>
			<Player
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
