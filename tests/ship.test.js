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
    const ship = new Ship(-1);
	expect(ship.length).toThrowError(/length/);
});
test("Test Ship length (wrong input 1)", () => {
    const ship = new Ship("a");
	expect(ship.length).toThrowError(/type/);
});
