import { expect, test } from "vitest";
import Ship from "../src/ship";

test("Test Ship length 1", () => {
	const ship = new Ship(4);
	expect(ship.length).toBe(4);
});
test("Test Ship length 2", () => {
	const ship = new Ship(2);
	expect(ship.length).toBe(2);
});
test("Test Ship length (wrong input 1)", () => {
	expect(() => new Ship(-1)).toThrowError(/length/);
});
test("Test Ship length (wrong input 1)", () => {
	expect(() => new Ship("a")).toThrowError(/type/);
});
test("Test Ship length (no input)", () => {
	const ship = new Ship();
	expect(ship.length).toBeTypeOf("number");
});
