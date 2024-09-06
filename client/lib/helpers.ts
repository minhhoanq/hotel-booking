//Correct VND currency format
export const formatMoney = (number: number) =>
    Number(number?.toFixed(1)).toLocaleString();
