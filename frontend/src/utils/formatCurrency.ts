export const formatCurrency = (value: string | number): string => {
  if (typeof value === "number") {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  }

  const numericValue = value.replace(/\D/g, "");

  const floatValue = parseFloat(numericValue) / 100;

  return floatValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};
