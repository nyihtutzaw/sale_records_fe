import { useDispatch, useSelector } from 'react-redux';
import { getProfitReport } from '../../store/actions';

function useProfitReport() {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.report);

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
    {
      label: 'Total Sold Price',
      value: 'totalSoldAmount',
      content: (_data) => _data,
    },
    {
      label: 'Total Init Price',
      value: 'totalPurchaseAmount',
      content: (_data) => _data,
    },
    {
      label: 'Profit',
      value: 'profit',
      content: (_data) => _data,
    },
    
  ];

  const loadData = (query) => {
    if(!query) {
      return;
    }
    dispatch(getProfitReport(query));
  };

  return {
    headers,
    loadData,
    data: report?.profit,
  };
}
export default useProfitReport;
