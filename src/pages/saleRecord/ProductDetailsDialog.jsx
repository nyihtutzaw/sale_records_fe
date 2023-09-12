import styled from 'styled-components';

import { Modal } from '../../components/Modal';
import ProductTable from './ProductTable';
import SaleRecordProductItem from './SaleRecordProductItem';

export default function ProductDetailsDialog({ open, toggle, data }) {
  return (
    <Modal
      title="Product Details"
      open={open}
      onClose={toggle}
      buttons={[]}
      maxWidth="md"
    >
      <ModalContent>
        <ProductTable
          tableBody={data.map((row, index) => (
            <SaleRecordProductItem
              row={row}
              index={index}
              key={row?.name}
              toggle={toggle}
              total={data?.length}
            />
          ))}
        />
      </ModalContent>
    </Modal>
  );
}
const ModalContent = styled.div`
  padding: 40px 0px;
`;
