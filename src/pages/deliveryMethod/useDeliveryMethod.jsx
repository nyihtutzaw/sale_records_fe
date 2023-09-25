import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { deleteDeliveryMethod, getDeliveryMethods } from '../../store/actions';
import useDialog from '../../hooks/useDialog';

function useDeliveryMethod() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const deliveryMethod = useSelector((state) => state.deliveryMethod);

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
      dispatch(deleteDeliveryMethod(id));
      closeConfirmDialog();
    },
    [closeConfirmDialog, dispatch],
  );

  const handleEdit = (id) => {
    navigate(`/Delivery-method-edit/${id}`);
  };

  const actionButtons = useMemo(
    () => (
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          navigate('/Delivery-method-create');
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
    dispatch(getDeliveryMethods(query));
  }, [dispatch, location.search]);

  return {
    headers,
    actionButtons,
    handleDelete,
    handleEdit,
    rows: deliveryMethod?.deliveryMethods,
    showConfirmDialog,
  };
}
export default useDeliveryMethod;
