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
	expect(testBoard.board[6][1]).toBe(null);
});

test("Place Boat 2", () => {
	testBoard.placeShip(3, [2, 2], 1);
	expect(testBoard.board[2][2]).toBe(3);
	expect(testBoard.board[3][2]).toBe(3);
	expect(testBoard.board[4][2]).toBe(3);
	expect(testBoard.board[5][2]).toBe(3);
	expect(testBoard.board[6][2]).toBe(null);
});

test("Place Boat 3", () => {
	testBoard.placeShip(2, [1, 3], 1);
	expect(testBoard.board[1][3]).toBe(2);
	expect(testBoard.board[2][3]).toBe(2);
	expect(testBoard.board[3][3]).toBe(2);
	expect(testBoard.board[4][3]).toBe(null);
});

test("Attack 1", () => {
    testBoard.attack([1,1])
    expect(testBoard.ships[2].hits).toBe(1)
})

test("Attack 2", () => {
    testBoard.attack([3,3])
    expect(testBoard.board[3][3]).toBe(-1)
})

test("Attack 3", () => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            testBoard.attack([i,j])
        }
    }
    expect(testBoard.isAllSunk()).toBe(true)
})