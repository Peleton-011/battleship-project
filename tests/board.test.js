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
	expect(testBoard.board[1][1]).toBe(1);
});

test("Place Boat 1", () => {
    testBoard.placeShip(2, [1,1], 1)
	expect(testBoard.board[1][1]).toBe(2);
});

test("Place Boat 3", () => {
    testBoard.placeShip(3, [1,1], 1)
	expect(testBoard.board[1][1]).toBe(3);
});

