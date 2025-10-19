// Map for ISO 4217
const currencyMap = {
  EUR: "978",
  USD: "840",
  GBP: "826",
  // Add other currencies if needed
};

// Map for periods
const periodMap = {
  once: 1,
  daily: 2,
  weekly: 3,
  monthly: 4,
  yearly: 5,
};

// Function for calculating basic salary
export function calculateProposedSalary({ value, currencyCode, period }) {
  if (!value || isNaN(value) || value <= 0) {
    throw new Error("Incorrect salary value");
  }

  const currencyId = currencyMap[currencyCode];
  if (!currencyId) {
    throw new Error("Incorrect currency code");
  }

  const periodId = periodMap[period];
  if (!periodId) {
    throw new Error("Incorrect period");
  }

  return {
    value: parseFloat(value.toFixed(2)), // Round to two decimal places
    currencyId,
    periodId,
  };
}

// Function for calculating the total salary taking into account bonuses
export function calculateTotalSalary(baseSalary, bonuses = []) {
  let totalValue = baseSalary.value;

  bonuses.forEach(bonus => {
    if (!bonus.value || isNaN(bonus.value) || bonus.value <= 0) {
      throw new Error("Incorrect bonus value");
    }

    if (bonus.currencyId !== baseSalary.currencyId) {
      throw new Error("Bonus currency must match base salary currency");
    }

    totalValue += bonus.value;
  });

  return {
    value: parseFloat(totalValue.toFixed(2)), // Round to two decimal places
    currencyId: baseSalary.currencyId,
    periodId: baseSalary.periodId, // Total salary retains base salary period
  };
}
