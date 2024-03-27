export const generateNumberRangeStringArray = (
  start: number,
  end: number,
  decimalPlaces = 0,
  step: number = 1,
): string[] => {
  const result: string[] = [];

  const addLeadingZero = (num: number) => {
    if (decimalPlaces === -1) {
      return num.toString().padStart(2, '0');
    } else {
      return num.toFixed(decimalPlaces);
    }
  };

  for (let i = start; i <= end; i += step) {
    result.push(addLeadingZero(i));
  }
  return result;
};

export const to00 = (num: number) => num.toString().padStart(2, '0');

export const formatCurrency = (number: number | string): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
