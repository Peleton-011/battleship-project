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
test("Place Boat 1", () => {
    testBoard.placeShip(1, [1,1], 1)
	expect(testBoard.board[1][1]).toStrictEqual(testBoard.ships[1]);
});

