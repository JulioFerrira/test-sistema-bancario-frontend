export const moneyMask = (value: number) => {
  const result = new Intl.NumberFormat("es-Cl", {
    style: "currency",
    currency: "CLP",
  }).format(value);
  return result;
};
