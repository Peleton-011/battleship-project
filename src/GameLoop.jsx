// import GameBoard  "./board";
import Board from "./components/Board";

const GameLoop = () => {

	// function start() {
	// 	const timer = (ms) => new Promise((res) => setTimeout(res, ms));
	// 	this.board1.ships.forEach((ship) => {
	// 		this.board1.placeShip();
	// 	});
	// }
	return (
		<div>
			<Board />
		</div>
	);
};

export default GameLoop;
