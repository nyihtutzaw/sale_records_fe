import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { deleteProduct, getProducts } from '../../store/actions';
import useDialog from '../../hooks/useDialog';

function useProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const product = useSelector((state) => state.product);
  // const status = useSelector((state) => state.status);
  const { page, limit } = queryString.parse(location.search);
  const pageLimitNo = ((parseInt(page - 1, 10)) * parseInt(limit , 10));
  const headers = [
    {
      label: 'No',
      value: 'No',
      content: (_data, index) => pageLimitNo ? pageLimitNo + index + 1 : index  + 1,
    },
    {
      label: 'Name',
      value: 'name',
    },
    {
      label: 'Init Price',
      value: 'initPrice',
    },
    {
      label: 'WholeSale Price',
      value: 'wholeSalePrice',
    },
    {
      label: 'Price',
      value: 'price',
    },
    {
      label: 'Qty',
      value: 'qty',
    },
  ];
  const { showConfirmDialog, closeConfirmDialog } = useDialog();

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteProduct(id));
      closeConfirmDialog();
    },
    [closeConfirmDialog, dispatch],
  );

  const handleEdit = (id) => {
    navigate(`/product-edit/${id}`);
  };

  const actionButtons = useMemo(
    () => (
      <Button
        color="primary"
        variant="contained"
        onClick={() => navigate('/product-create')}
      >
        Add New
      </Button>
    ),
    [navigate],
  );

  useEffect(() => {
    let query = { limit: 10, page: 1 };
    if (location.search) query = queryString.parse(location.search);
    dispatch(getProducts(query));
  }, [dispatch, location.search]);

  return {
    headers,
    actionButtons,
    handleDelete,
    handleEdit,
    showConfirmDialog,
    rows: product?.products,
    total: product?.total,
  };
}
export default useProduct;
