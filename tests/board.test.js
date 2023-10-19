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
	testBoard.placeShip(1, [1, 1], 1);
	expect(testBoard.board[1][1]).toBe(1);
	expect(testBoard.board[2][1]).toBe(1);
	expect(testBoard.board[3][1]).toBe(1);
	expect(testBoard.board[4][1]).toBe(null);
});

test("Place Boat 2", () => {
	testBoard.placeShip(3, [1, 1], 1);
	expect(testBoard.board[2][2]).toBe(3);
	expect(testBoard.board[3][2]).toBe(3);
	expect(testBoard.board[4][2]).toBe(3);
	expect(testBoard.board[5][2]).toBe(3);
	expect(testBoard.board[6][2]).toBe(null);
});

test("Place Boat 3", () => {
	testBoard.placeShip(2, [1, 1], 1);
	expect(testBoard.board[1][1]).toBe(2);
	expect(testBoard.board[2][1]).toBe(2);
	expect(testBoard.board[3][1]).toBe(2);
	expect(testBoard.board[4][1]).toBe(null);
});
