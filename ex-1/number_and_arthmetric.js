export const dayRate = (ratePerHour) => ratePerHour * 8;
export const daysInBudget = (budget, ratePerHour) =>
  Math.floor(budget / (ratePerHour * 8));
export const priceWithMonthlyDiscount = (ratePerHour, numDays, discount) =>
  Math.ceil(
    Math.floor(numDays / 22) * 176 * ratePerHour * (1 - discount) +
      (numDays % 22) * 8 * ratePerHour
  );
