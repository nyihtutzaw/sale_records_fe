import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { deleteAdmin, getAdmins } from '../../store/actions';
import useDialog from '../../hooks/useDialog';

function useAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const admin = useSelector((state) => state.admin);
  const { showConfirmDialog, closeConfirmDialog } = useDialog();

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

  const actionButtons = useMemo(() => (
    // eslint-disable-next-line react/jsx-filename-extension
    <Button color="primary" variant="contained" onClick={()=>  navigate('/admin-create')}>
      Add New
    </Button>
  ), [navigate]);

  useEffect(() => {
    let query = { limit: 10, page: 1 };
    if (location.search) query = queryString.parse(location.search);
    dispatch(getAdmins(query));
  }, [dispatch, location.search]);
  

  return {
    headers,
    actionButtons,
    rows: admin.admins,
    handleEdit,
    handleDelete,
    showConfirmDialog,
  };
}

export default useAdmin;
