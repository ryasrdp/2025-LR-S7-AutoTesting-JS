const { expect } = require("chai");
const {
  calculateProposedSalary,
  calculateTotalSalary,
} = require("../src/util/salaryCalculator");
const Fakerator = require("fakerator");

const fakerator = Fakerator();

describe("calculateProposedSalary function", () => {
  it("should calculate proposed salary correctly", () => {
    const value = fakerator.random.number(200, 500);
    const result = calculateProposedSalary({
      value: value,
      currencyCode: "EUR",
      period: "monthly",
    });

    expect(result).to.deep.equal({
      value: value,
      currencyId: "978",
      periodId: 4,
    });
  });
});
