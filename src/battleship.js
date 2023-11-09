import GameBoard from "./board";
export default class GameLoop {
	callBack;
	constructor() {
		this.board1 = new GameBoard();
		this.board2 = new GameBoard();
	}

	async start() {
		const timer = (ms) => new Promise((res) => setTimeout(res, ms));
		//While none of the players have lost all their ships, play the game loop
		while (
			[this.board1, this.board2].every(
				(board) =>
					!board.ships.every(
						(ship) => typeof ship !== "number" && !ship.isSunk()
					)
			)
		) {
			//If not all ships have been placed, this.callBack places them

			[this.board1, this.board2].forEach((board) => {
				if (!board.ships.every((ship) => typeof ship !== "number")) {
					board.callBack = (x, y, orient, board) => {
						board.placeShip(1);
					};
				}
			});

			await timer(1000);
			console.log("cume");
		}
		this.board1.ships.forEach((ship) => {
			this.board1.placeShip();
		});
	}
}
