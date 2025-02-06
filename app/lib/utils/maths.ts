export const getRoundedPercent = (amount: number, total: number) => {
  return Math.round((amount / total) * 100);
};
