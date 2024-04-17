import { describe, expect, it } from "@jest/globals";
import { sum } from "./sum";

describe("Sum Test Tests", () => {
	it("should return the sum of a and b", async () => {
		const a = 2;
		const b = 3;
		const result = sum(a, b);
		expect(result).toEqual(5);
	});
});
