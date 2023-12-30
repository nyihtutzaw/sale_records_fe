import { useCallback, useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';


import dayjs from 'dayjs';
import { getSaleRecords, deleteSaleRecord } from '../../store/actions';
import useDialog from '../../hooks/useDialog';
import { calculateSaleTotal } from '../../utils/calculateSaleTotal';

function useSaleRecord() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const saleRecord = useSelector((state) => state.saleRecord);
  const [openDialog, setOpenDialog] = useState(false);
  const [detailRecord, setDetailRecord] = useState([]);
  const [editData, setEditData] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const headers = [
    {
      label: 'No',
      value: 'Num',
      content: (_data, index) => index + 1,
    },
    {
      label: 'Date',
      value: 'date',
      content: (_data) => dayjs(_data).format('DD/MM/YYYY'),
    },
    {
      label: 'Total',
      value: 'sale_record_details',
      content: (_data) => calculateSaleTotal(_data),
    },
    {
      label: 'Customer',
      value: 'Customer',
      content: (_data) => _data?.name,
    },
    {
      label: 'Payment Method',
      value: 'payment_method',
      content: (_data) => _data?.name,
    },
    {
      label: 'Delivery Method',
      value: 'delivery_method',
      content: (_data) => _data?.name,
    },
  ];
  const { showConfirmDialog, closeConfirmDialog } = useDialog();

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteSaleRecord(id));
      closeConfirmDialog();
    },
    [closeConfirmDialog, dispatch],
  );

  useEffect(() => {
    let query = { limit: 10, page: 1 };
    if (location.search) query = queryString.parse(location.search);
    dispatch(getSaleRecords(query));
  }, [dispatch, location.search]);

  const handleDetailDialogToggle = () => {
    setOpenDialog((prevOpen) => !prevOpen);
  };

  const handleSaleRecordDetail = (recordID) => {
    const details = saleRecord?.saleRecords?.find((record) => record?.id === recordID)
    if(details) {
      setDetailRecord(details?.sale_record_details)
    }
  };

  const handleInvoice = (id) => {
    navigate(`/invoice/${id}`);
  };

  const handleEdit = (id) => {
    setEditData(
      saleRecord?.saleRecords?.find((record) => record?.id === id),
    );
    setOpenEditDialog(true);
  };

  const handleEditDialogToggle = () => {
    setOpenEditDialog((prevOpen) => !prevOpen);
  };

  return {
    headers,
    rows: saleRecord.saleRecords,
    total: saleRecord?.total,
    openDialog,
    handleDetailDialogToggle,
    detailRecord,
    handleSaleRecordDetail,
    handleDelete,
    showConfirmDialog,
    handleInvoice,
    handleEdit,
    openEditDialog,
    editData,
    handleEditDialogToggle,
  };
}
export default useSaleRecord;
