import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { deleteCustomer, getCustomers } from '../../store/actions';
import { Table } from '../../components/Table';
import useDialog from '../../hooks/useDialog';

function CustomerList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const customer = useSelector((state) => state.customer);
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
      label: 'Phone',
      value: 'phone',
    },
  ];
  const { showConfirmDialog, closeConfirmDialog } = useDialog();

  const handleAddNew = () => {
    navigate('/customer-create');
  };
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
      <Button color="primary" variant="contained" onClick={handleAddNew}>
        Add New
      </Button>
    ),
    [],
  );

  useEffect(() => {
    let query = { limit: 10, page: 1 };
    if (location.search) query = queryString.parse(location.search);
    dispatch(getCustomers(query));
  }, [dispatch, location.search]);

  return (
    <TableWrapper>
      <Table
        buttons={actionButtons}
        headers={headers}
        loading={status.loading}
        rows={customer.customers}
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
export default CustomerList;

const TableWrapper = styled.div`
 width: 100%;
`

