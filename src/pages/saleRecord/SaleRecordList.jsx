import DeleteIcon from '@mui/icons-material/Delete';
import { FormatListNumbered } from '@mui/icons-material';
import styled from 'styled-components';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EditIcon from '@mui/icons-material/Edit';
import { Table } from '../../components/Table';
import ProductDetailsDialog from './ProductDetailsDialog';
import useSaleRecord from './useSaleRecord';
import EditSaleRecordDialog from './EditSaleRecordDialog';

function SaleRecordList() {
  const {
    headers,
    rows,
    total,
    openDialog,
    handleDetailDialogToggle,
    detailRecord,
    handleSaleRecordDetail,
    handleDelete,
    showConfirmDialog,
    handleInvoice,
    handleEdit,
    openEditDialog,
    editData,
    handleEditDialogToggle,
  } = useSaleRecord();

  return (
    <TableWrapper>
      <Table
        headers={headers}
        rows={rows}
        total={total}
        extraActionButtons={[
          {
            icon: <ReceiptIcon />,
            color: 'primary',
            onClick: (id) => {
              handleInvoice(id)
            },
            key: 'invoice',
          },
          {
            icon: <FormatListNumbered />,
            color: 'primary',
            onClick: (id) => {
              handleDetailDialogToggle();
              handleSaleRecordDetail(id);
            },
            key: 'details',
          },
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
            key: 'delete',
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
      <ProductDetailsDialog
        open={openDialog}
        toggle={handleDetailDialogToggle}
        data={detailRecord}
      />
      <EditSaleRecordDialog
        open={openEditDialog}
        toggle={handleEditDialogToggle}
        data={editData}
      />
    </TableWrapper>
  );
}
export default SaleRecordList;

const TableWrapper = styled.div`
  width: 100%;
`;
