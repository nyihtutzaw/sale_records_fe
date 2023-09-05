import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setInvoiceSetting, setSaleRecord } from '../../store/actions';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

function useInvoice() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { copy } = useCopyToClipboard();
  const saleRecord = useSelector((state) => state.saleRecord.saleRecord);
  const invoiceSetting = useSelector(
    (state) => state.invoiceSetting.invoiceSetting,
  );

  useEffect(() => {
    dispatch(setSaleRecord(id));
    dispatch(setInvoiceSetting());
  }, [dispatch, id]);

  const copyTextToClipboard = async () => {
    await copy(window.location.href);
  };

  return {
    saleRecord,
    copyTextToClipboard,
    invoiceSetting
  }
}

export default useInvoice;
