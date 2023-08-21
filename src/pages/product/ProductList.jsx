import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { deleteProduct, getProducts } from '../../store/actions';
import { Table } from '../../components/Table';
import useDialog from '../../hooks/useDialog';

function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const product = useSelector((state) => state.product);
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
    {
      label: 'Init Price',
      value: 'initPrice',
    },
    {
      label: 'Price',
      value: 'price',
    },
  ];
  const { showConfirmDialog, closeConfirmDialog } = useDialog();

  const handleAddNew = () => {
    navigate('/product-create');
  };
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
      <Button color="primary" variant="contained" onClick={handleAddNew}>
        Add New
      </Button>
    ),
    [],
  );
  const loadData = async () => {
    let query = { limit: 10, page: 1 };
    if (location.search) query = queryString.parse(location.search);
    dispatch(getProducts(query));
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
      rows={product.products}
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
export default ProductList;

const TableWrapper = styled.div`
 width: 100%;
`

