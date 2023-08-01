import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Table } from '../components/Table/index';
import { getUsers } from '../store/actions/user';

function TablePage() {
  const dispatch = useDispatch();
  const location=useLocation();
  const user = useSelector((state) => state.user);
  const status = useSelector((state) => state.status);

  const headers = [
    {
      label: 'No',
      content: (_data, index) => index + 1,
      stickyLeft: 0,
    },
    {
      label: 'Name',
      value: 'name',
      stickyLeft: 50,
    },
    {
      label: 'UserName',
      value: 'username',
    },
    {
      label: 'Email',
      value: 'email',
    },
    {
      label: 'Phone',
      value: 'phone',
    },
    {
      label: 'Street',
      value: 'address',
      content: (_data) => _data.street,
    },
    {
      label: 'City',
      value: 'address',
      content: (_data) => _data.city,
    },
    {
      label: 'Zipcode',
      value: 'address',
      content: (_data) => _data.zipcode,
    },
    {
      label: 'Phone',
      value: 'phone',
    },
    {
      label: 'Website',
      value: 'website',
    },
    {
      label: 'Company',
      value: 'company',
      content: (_data) => _data.name,
      stickyRight: 0,
    },
  ];

  const actionButtons = useMemo(
    () => (
      <>
        <Button color="primary" variant="contained">
          Add New
        </Button>
        <Button color="secondary" variant="contained">
          Print
        </Button>
        <Button color="success" variant="contained">
          Export
        </Button>
      </>
    ),
    [],
  );

  useEffect(() => {
    let query = { limit: 10, page: 1 };
    if (location.search)
      query = queryString.parse(location.search);
    dispatch(getUsers(query));
  }, [dispatch, location.search]);

  return (
    <Table
      buttons={actionButtons}
      headers={headers}
      loading={status.loading}
      rows={user.users}
    />
  );
}

export default TablePage;
