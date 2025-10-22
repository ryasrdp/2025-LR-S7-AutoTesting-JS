import {
  calculateProposedSalary,
  calculateTotalSalary,
} from "../src/util/salaryCalculator";
import Fakerator from 'fakerator';

const fakerator = Fakerator();

describe("calculateProposedSalary", () => {
  it("should calculate salary correctly with valid inputs", () => {
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

  it("should throw error for invalid salary value", () => {
    expect(() => calculateProposedSalary({
      value: -100,
      currencyCode: "EUR",
      period: "monthly",
    }),
    ).toThrow('Incorrect salary value');
  });

  it("should throw error for invalid salary value zero case", () => {
    expect(() => calculateProposedSalary({
          value: 0,
          currencyCode: "EUR",
          period: "monthly",
        }),
    ).toThrow('Incorrect salary value');
  });

  it("should throw error for invalid salary currency code", () => {
    expect(() => calculateProposedSalary({
          value: 50000000,
          currencyCode: "INR",
          period: "weekly",
        }),
    ).toThrow('Incorrect currency code');
  });

  it("should throw error for invalid salary invalid period", () => {
    expect(() => calculateProposedSalary({
          value: 500,
          currencyCode: "EUR",
          period: "invalid_period",
        }),
    ).toThrow('Incorrect period');
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

  it("should throw an error if bonus value is invalid", () => {
    const baseSalary = {
      value: 3000.5,
      currencyId: "978",
      periodId: 4,
    };

    const bonuses = [
      { value: 500, currencyId: "978" },
      { value: -200, currencyId: "978" },
    ];
    expect(() => calculateTotalSalary(baseSalary, bonuses)).toThrow(
        "Incorrect bonus value",
    )
  });

  it("should throw an error if bonus value is not a number", () => {
    const baseSalary = {
      value: 3000.5,
      currencyId: "978",
      periodId: 4,
    };

    const bonuses = [
      { value: 500, currencyId: "978" },
      { value: 'NaN', currencyId: "978" },
    ];
    expect(() => calculateTotalSalary(baseSalary, bonuses)).toThrow(
        "Incorrect bonus value",
    )
  });

  it("should throw an error if bonus value null", () => {
    const baseSalary = {
      value: 3000.5,
      currencyId: "978",
      periodId: 4,
    };

    const bonuses = [
      { value: 500, currencyId: "978" },
      { value: 0, currencyId: "978" },
    ];
    expect(() => calculateTotalSalary(baseSalary, bonuses)).toThrow(
        "Incorrect bonus value",
    );
  });

  it("should throw an error if currency does not match base salary currency", () => {
    const baseSalary = {
      value: 3000.5,
      currencyId: "978",
      periodId: 4,
    };

    const bonuses = [
      { value: 500, currencyId: "978" },
      { value: 200, currencyId: "826" },
    ];
    expect(() => calculateTotalSalary(baseSalary, bonuses)).toThrow(
        "Bonus currency must match base salary currency",
    );
  });
});
