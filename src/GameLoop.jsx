import GameBoard from "./board";
import Board from "./components/Board";

const GameLoop = () => {
	const board1 = new GameBoard();
	const board2 = new GameBoard();

	function start() {
		const timer = (ms) => new Promise((res) => setTimeout(res, ms));
		this.board1.ships.forEach((ship) => {
			this.board1.placeShip();
		});
	}
	return <div>
        <Board board={board1} />
    </div>;
};

export default GameLoop;
