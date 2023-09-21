import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { deleteCustomer, getCustomers } from '../../store/actions';
import useDialog from '../../hooks/useDialog';

function useCustomer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const customer = useSelector((state) => state.customer);

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
    {
      label: 'Phone',
      value: 'phone',
    },
    {
      label: 'Address',
      value: 'address',
    },
  ];
  const { showConfirmDialog, closeConfirmDialog } = useDialog();

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteCustomer(id));
      closeConfirmDialog();
    },
    [closeConfirmDialog, dispatch],
  );

  const handleEdit = (id) => {
    navigate(`/customer-edit/${id}`);
  };

  const actionButtons = useMemo(
    () => (
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          navigate('/customer-create');
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
    dispatch(getCustomers(query));
  }, [dispatch, location.search]);

  return {
    headers,
    actionButtons,
    rows: customer.customers,
    total: customer?.total,
    handleEdit,
    handleDelete,
    showConfirmDialog,
  };
}
export default useCustomer;
