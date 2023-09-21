import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { Table } from '../../components/Table';
import usePaymentMethod from './usePaymentMethod';

function PaymentMethodList() {
  const {
    headers,
    actionButtons,
    rows,
    handleDelete,
    handleEdit,
    showConfirmDialog
  } = usePaymentMethod();

  return (
   <TableWrapper>
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
export default PaymentMethodList;

const TableWrapper = styled.div`
 width: 100%;
`

