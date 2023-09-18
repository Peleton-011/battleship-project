import { expect, test } from "vitest";
import GameBoard from "../src/board";

const testBoard = new GameBoard();
test("Board Size", () => {
	expect(testBoard.board).toHaveLength(10);
});
test("Board Size", () => {
	expect(testBoard.board[0]).toHaveLength(10);
});
test("Boat List", () => {
	expect(testBoard.ships).toHaveLength(5);
});


