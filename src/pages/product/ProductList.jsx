import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { Table } from '../../components/Table';
import useProduct from './useProduct';

function ProductList() {
  const {
    headers,
    actionButtons,
    rows,
    loading,
    total,
    handleDelete,
    handleEdit,
    showConfirmDialog
  } = useProduct()

  return (
   <TableWrapper>
     <Table
      buttons={actionButtons}
      headers={headers}
      loading={loading}
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
export default ProductList;

const TableWrapper = styled.div`
 width: 100%;
`

