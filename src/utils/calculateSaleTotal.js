export const calculateSaleTotal = (data) => {
  const saleTotal = data?.reduce(
    (total, sale) => total + sale.price * sale.qty,
    0,
  );
  return saleTotal;
};
