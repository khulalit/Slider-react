export const calculatePercentage = (
  value: number,
  min: number,
  max: number
) => {
  const interval = max - min;
  return Math.floor(((value - min) / interval) * 100);
};
