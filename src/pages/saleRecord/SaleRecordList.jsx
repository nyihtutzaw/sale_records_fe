import DeleteIcon from '@mui/icons-material/Delete';
import { FormatListNumbered } from '@mui/icons-material';
import styled from 'styled-components';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Table } from '../../components/Table';
import ProductDetailsDialog from './ProductDetailsDialog';
import useSaleRecord from './useSaleRecord';

function SaleRecordList() {
  const {
    headers,
    loading,
    rows,
    openDialog,
    handleDetailDialogToggle,
    detailRecord,
    handleSaleRecordDetail,
    handleDelete,
    showConfirmDialog,
    handleInvoice
  } = useSaleRecord();

  return (
    <TableWrapper>
      <Table
        headers={headers}
        loading={loading}
        rows={rows}
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
    </TableWrapper>
  );
}
export default SaleRecordList;

const TableWrapper = styled.div`
  width: 100%;
`;
