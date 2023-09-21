import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table } from '../../components/Table';
import useAdmin from './useAdmin';

function AdminList() {
  const {
    headers,
    actionButtons,
    loading,
    rows,
    handleEdit,
    handleDelete,
    showConfirmDialog,
  } = useAdmin();

  return (
    <Table
      buttons={actionButtons}
      headers={headers}
      
      rows={rows}
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
              title: 'Admin Delete',
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
