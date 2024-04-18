import { describe, expect, it } from "@jest/globals";
import "./polyfills";

describe("BigInt polyfill toJSON", () => {
	it("should serialise positive BigInt to string", () => {
		const bigIntValue = BigInt(12345678901234567890n);
		const serialised = JSON.stringify({ value: bigIntValue });
		expect(serialised).toBe('{"value":"12345678901234567890"}');
	});

	it("should serialise negative BigInt to string", () => {
		const bigIntValue = BigInt(-12345678901234567890n);
		const serialised = JSON.stringify({ value: bigIntValue });
		expect(serialised).toBe('{"value":"-12345678901234567890"}');
	});

	it("should serialise BigInt zero to string", () => {
		const bigIntValue = BigInt(0);
		const serialised = JSON.stringify({ value: bigIntValue });
		expect(serialised).toBe('{"value":"0"}');
	});

	it("should serialise BigInt with maximum value to string", () => {
		const bigIntValue = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
		const serialised = JSON.stringify({ value: bigIntValue });
		expect(serialised).toBe(`{"value":"${BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1)}"}`);
	});

	it("should serialise BigInt with minimum value to string", () => {
		const bigIntValue = BigInt(Number.MIN_SAFE_INTEGER);
		const serialised = JSON.stringify({ value: bigIntValue });
		expect(serialised).toBe(`{"value":"${BigInt(Number.MIN_SAFE_INTEGER)}"}`);
	});

	it("should handle BigInt serialization in objects with other types", () => {
		const bigIntValue = BigInt(12345678901234567890n);
		const obj = {
			stringValue: "Hello",
			numberValue: 42,
			bigIntValue: bigIntValue,
		};
		const serialised = JSON.stringify(obj);
		expect(serialised).toBe(
			'{"stringValue":"Hello","numberValue":42,"bigIntValue":"12345678901234567890"}',
		);
	});

	it("should handle BigInt serialization in arrays", () => {
		const bigIntValue = BigInt(12345678901234567890n);
		const arr = [bigIntValue, "Hello", 42];
		const serialised = JSON.stringify(arr);
		expect(serialised).toBe('["12345678901234567890","Hello",42]');
	});
});
