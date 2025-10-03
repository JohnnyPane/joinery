export const moneyDisplay = (amount) => {
  if (amount === null || amount === undefined) {
    return "$0.00";
  }
  return `$${(amount / 100).toFixed(2)}`;
}