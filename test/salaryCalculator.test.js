import {
  calculateProposedSalary,
  calculateTotalSalary,
} from "../src/util/salaryCalculator";
import Fakerator from 'fakerator';

const fakerator = Fakerator();

describe("calculateProposedSalary", () => {
  it("should calculate salary with valid inputs", () => {
    const value = fakerator.random.number(200, 500, 2);
    const result = calculateProposedSalary({
      value: value,
      currencyCode: "EUR",
      period: "monthly",
    });
    expect(result).toEqual({
      value: value,
      currencyId: "978",
      periodId: 4,
    });
  });
});

describe("calculateTotalSalary", () => {
  const baseSalary = {
    value: 3000.5,
    currencyId: "978",
    periodId: 4,
  };

  it("should calculate total salary with valid bonuses", () => {
    const bonuses = [
      { value: 500, currencyId: "978" },
      { value: 1000, currencyId: "978" },
      { value: 200, currencyId: "978" },
    ];
    const result = calculateTotalSalary(baseSalary, bonuses);
    expect(result).toEqual({
      value: 4700.5,
      currencyId: "978",
      periodId: 4,
    });
  });
});
