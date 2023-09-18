import { expect, test } from "vitest";
import Ship from "../src/ship";

test("sample test", () => {
	const ship = new Ship();
	expect(ship.test("a")).toBe("a");
});
