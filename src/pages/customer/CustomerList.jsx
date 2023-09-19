import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { Table } from '../../components/Table';
import useCustomer from './useCustomer';

function CustomerList() {
  const {
    headers,
    actionButtons,
    rows,
    total,
    handleEdit,
    handleDelete,
    showConfirmDialog,
  } = useCustomer();

  return (
    <TableWrapper>
      <Table
        buttons={actionButtons}
        headers={headers}
        rows={rows}
        total={total}
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

