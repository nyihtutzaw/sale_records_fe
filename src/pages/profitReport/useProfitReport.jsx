import { useDispatch, useSelector } from 'react-redux';
import { getProfitReport } from '../../store/actions';

function useProfitReport() {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.report);

  const calculateTotal = (data) => (data?.qty || 0) * (data?.price || 0)
  const headers = [
    {
      label: 'No',
      value: 'No',
      content: (_data, index) => index + 1,
    },
    {
      label: 'Product',
      value: 'Product',
      content: (_data) => _data?.name,
    },
    {
      label: 'Qty',
      value: 'qty',
      content: (_data) => _data,
    },
    {
      label: 'Total',
      content: (_data) => calculateTotal(_data),
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
