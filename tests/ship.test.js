import { expect, test } from "vitest";
import Ship from "../src/ship";

//Length
test("Ship length 1", () => {
	const ship = new Ship(4, 4, 4, 3);
	expect(ship.length).toBe(4);
});
test("Ship length 2", () => {
	const ship = new Ship(2, 4, 4, 3);
	expect(ship.length).toBe(2);
});
test("Ship length (wrong input 1)", () => {
	expect(() => new Ship(-1)).toThrowError(/type/);
});
test("Ship length (wrong input 1)", () => {
	expect(() => new Ship("a")).toThrowError(/type/);
});
test("Ship length (no input)", () => {
	const ship = new Ship(null, 4, 4, 3);
	expect(ship.length).toBeTypeOf("number");
});

//Hits & hit()
const testShip = new Ship(4, 4, 4, 3);
test("Hits 1", () => {
	expect(testShip.hits).toBe(0);
});
test("Hits 2", () => {
	testShip.hit();
	expect(testShip.hits).toBe(1);
});
test("Hits 3", () => {
	testShip.hit();
	expect(testShip.hits).toBe(2);
});
//isSunk()
test("isSunk 1", () => {
	expect(testShip.isSunk()).toBe(false);
});

test("isSunk 2", () => {
	testShip.hit();
	testShip.hit();
	expect(testShip.isSunk()).toBe(true);
});

test.each([
	{
		orient: 0,
		result: [
			[5, 5],
			[5, 4],
			[5, 3],
			[5, 2],
		],
	},
	{
		orient: 1,
		result: [
			[5, 5],
			[6, 5],
			[7, 5],
			[8, 5],
		],
	},
	{
		orient: 2,
		result: [
			[5, 5],
			[5, 6],
			[5, 7],
			[5, 8],
		],
	},
	{
		orient: 3,
		result: [
			[5, 5],
			[4, 5],
			[3, 5],
			[2, 5],
		],
	},
])("Get ship coordinates, test rotation $orient", ({ orient, result }) => {
	const tinyTestShip = new Ship(4, 4, 4, 3);
	const calc = tinyTestShip.getShipCoords(4, [5, 5], orient);
	expect(calc).toStrictEqual(result);
});
