export const formatMoney = (number: number) =>
    Number(number?.toFixed(1)).toLocaleString();

export const formatPrice = (number: number) => Math.round(number / 1000) * 1000;
