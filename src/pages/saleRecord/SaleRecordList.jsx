import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

import dayjs from 'dayjs';
import { FormatListNumbered } from '@mui/icons-material';
import { getSaleRecords, deleteSaleRecord } from '../../store/actions';
import { Table } from '../../components/Table';
import useDialog from '../../hooks/useDialog';
import ProductDetailsDialog from './ProductDetailsDialog';
import { calculateSaleTotal } from '../../utils/calculateSaleTotal';

function SaleRecordList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const saleRecord = useSelector((state) => state.saleRecord);
  const status = useSelector((state) => state.status);
  const [openDialog, setOpenDialog] = useState(false);
  const [detailRecord, setDetailRecord] = useState([]);

  const headers = [
    {
      label: 'No',
      value: 'Num',
      content: (_data, index) => index + 1,
    },
    {
      label: 'Date',
      value: 'date',
      content: (_data) => dayjs(_data).format('DD/MM/YYYY')
    },
    {
      label: 'Total',
      value: 'sale_record_details',
      content: (_data) => calculateSaleTotal(_data),
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

  const loadData = async () => {
    let query = { limit: 10, page: 1 };
    if (location.search) query = queryString.parse(location.search);
    dispatch(getSaleRecords(query));
  };

  useEffect(() => {
    loadData();
  }, [location.search]);

  const toggle = () => {
    setOpenDialog((prevOpen) => !prevOpen);
  };

  const handleSaleRecordDetail = (recordID) => {
    setDetailRecord(
      saleRecord?.saleRecords?.find((record) => record?.id === recordID)
        ?.sale_record_details,
    );
  };

  return (
    <>
      <Table
        headers={headers}
        loading={status.loading}
        rows={saleRecord?.saleRecords}
        extraActionButtons={[
          {
            icon: <FormatListNumbered />,
            color: 'primary',
            onClick: (id) => {
              toggle();
              handleSaleRecordDetail(id);
            },
            key: 'details',
          },
          {
            icon: <DeleteIcon />,
            color: 'error',
            key: 'delete',
            onClick: (id) => {
              showConfirmDialog({
                title: 'Sample Confirm Dialog',
                body: 'Are you sure to delete?',
                onConfirm: () => handleDelete(id),
                cancelLabel: 'Cancel',
                acceptLabel: 'Confirm',
              });
            },
          },
        ]}
      />
      <ProductDetailsDialog
        open={openDialog}
        toggle={toggle}
        data={detailRecord}
      />
    </>
  );
}
export default SaleRecordList;
