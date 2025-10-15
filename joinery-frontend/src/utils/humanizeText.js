export const moneyDisplay = (amount) => {
  if (amount === null || amount === undefined) {
    return "$0.00";
  }

  const dollars = amount / 100;
  return `$${dollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const readableDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};