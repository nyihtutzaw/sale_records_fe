import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteAdmin, getAdmins } from '../../store/actions';
import { Table } from '../../components/Table';
import useDialog from '../../hooks/useDialog';

function AdminList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const admin = useSelector((state) => state.admin);
  const status = useSelector((state) => state.status);

  const headers = [
    {
      label: 'No',
      content: (_data, index) => index + 1,
    },
    {
      label: 'Name',
      value: 'name',
    },
    {
      label: 'Email',
      value: 'email',
    },
  ];
  const { showConfirmDialog,closeConfirmDialog } = useDialog();

  const handleAddNew = () => {
    navigate('/admin-create');
  };
  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteAdmin(id));
      closeConfirmDialog();
    },
    [closeConfirmDialog, dispatch],
  );

  const handleEdit = (id) => {
    navigate(`/admin-edit/${id}`);
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
    dispatch(getAdmins(query));
  }, [dispatch, location.search]);

  return (
    <Table
      buttons={actionButtons}
      headers={headers}
      loading={status.loading}
      rows={admin.admins}
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
  );
}
export default AdminList;
