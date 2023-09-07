import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { deletePaymentMethod, getPaymentMethods } from '../../store/actions';
import useDialog from '../../hooks/useDialog';

function usePaymentMethod() {
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
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          navigate('/payment-method-create');
        }}
      >
        Add New
      </Button>
    ),
    [navigate],
  );

  useEffect(() => {
    let query = { limit: 10, page: 1 };
    if (location.search) query = queryString.parse(location.search);
    dispatch(getPaymentMethods(query));
  }, [dispatch, location.search]);

  return {
    headers,
    actionButtons,
    handleDelete,
    handleEdit,
    rows: paymentMethod?.paymentMethods,
    loading: status?.loading,
    showConfirmDialog,
  };
}
export default usePaymentMethod;
