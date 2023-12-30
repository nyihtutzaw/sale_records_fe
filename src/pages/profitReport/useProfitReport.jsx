import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { getProfitReport } from '../../store/actions';

function useProfitReport() {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.report);

  const totalProfit = useMemo(() => {
    let total = 0;
    report?.profit.forEach((profit) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      total += parseInt(profit?.profit, 10);
    });

    return total;
  }, [report?.profit]);

  const totalSold = useMemo(() => {
    let total = 0;
    report?.profit.forEach((profit) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      total += parseInt(profit?.totalSoldAmount, 10);
    });

    return total;
  }, [report?.profit]);

  const totalPurchaseAmount = useMemo(() => {
    let total = 0;
    report?.profit.forEach((profit) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      total += parseInt(profit?.totalPurchaseAmount, 10);
    });

    return total;
  }, [report?.profit]);

  const headers = [
    {
      label: 'No',
      value: 'No',
      content: (_data, index) => index + 1,
    },
    {
      label: 'Product',
      value: 'name',
      content: (_data) => _data,
    },
    {
      label: 'Qty',
      value: 'totalQty',
      content: (_data) => _data,
    },
    // {
    //   label: 'Total Init Price',
    //   value: 'totalPurchaseAmount',
    //   content: (_data) => _data,
    // },
    {
      label: 'Total Sold Price',
      value: 'totalSoldAmount',
      content: (_data) => _data,
    },

    {
      label: 'Profit',
      value: 'profit',
    },
  ];

  const loadData = (query) => {
    if (!query) {
      return;
    }
    dispatch(getProfitReport(query));
  };

  return {
    headers,
    totalProfit,
    totalPurchaseAmount,
    totalSold,
    loadData,
    data: report?.profit,
  };
}
export default useProfitReport;
