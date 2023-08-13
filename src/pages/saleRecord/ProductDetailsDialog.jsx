import styled from 'styled-components';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Modal } from '../../components/Modal';
import ProductTable from './ProductTable';

export default function ProductDetailsDialog({ open, toggle, data }) {
  return (
    <Modal title="Product Details" open={open} onClose={toggle} buttons={[]}>
      <ModalContent>
        <ProductTable
          readOnly
          tableBody={data.map((row, index) => (
            <TableRow
              key={row?.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="center">
                {row?.Product?.name}
              </TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.qty}</TableCell>
              <TableCell align="center">{row.price * row.qty}</TableCell>
            </TableRow>
          ))}
        />
      </ModalContent>
    </Modal>
  );
}
const ModalContent = styled.div`
  padding: 40px 0px;
`;
