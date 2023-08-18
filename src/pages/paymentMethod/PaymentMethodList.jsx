import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { deletePaymentMethod, getPaymentMethods } from '../../store/actions';
import { Table } from '../../components/Table';
import useDialog from '../../hooks/useDialog';

function PaymentMethodList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const paymentMethod = useSelector((state) => state.paymentMethod);
  const status = useSelector((state) => state.status);

  const headers = [
    {
      label: 'No',
      value: 'No',
      content: (_data, index) => index + 1,
    },
    {
      label: 'Name',
      value: 'name',
    },
  ];
  const { showConfirmDialog, closeConfirmDialog } = useDialog();

  const handleAddNew = () => {
    navigate('/payment-method-create');
  };
  const handleDelete = useCallback(
    (id) => {
      dispatch(deletePaymentMethod(id));
      closeConfirmDialog();
    },
    [closeConfirmDialog, dispatch],
  );

  const handleEdit = (id) => {
    navigate(`/payment-method-edit/${id}`);
  };

  const actionButtons = useMemo(
    () => (
      <Button color="primary" variant="contained" onClick={handleAddNew}>
        Add New
      </Button>
    ),
    [],
  );
  const loadData = async () => {
    let query = { limit: 10, page: 1 };
    if (location.search) query = queryString.parse(location.search);
    dispatch(getPaymentMethods(query));
  };

  useEffect(() => {
    loadData();
  }, [dispatch, location.search]);

  return (
   <TableWrapper>
     <Table
      buttons={actionButtons}
      headers={headers}
      loading={status.loading}
      rows={paymentMethod.paymentMethods}
      extraActionButtons={[
        {
          icon: <EditIcon />,
          color: 'primary',
          onClick: (id) => {
            handleEdit(id);
          },
        },
        {
          icon: <DeleteIcon />,
          color: 'error',
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
   </TableWrapper>
  );
}
export default PaymentMethodList;

const TableWrapper = styled.div`
 width: 100%;
`

