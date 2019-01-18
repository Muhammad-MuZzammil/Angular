const lib = require("../lib");

describe("absolute", () => {
  it("should return a positive number If input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number If input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  it("should return 0 If input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});
