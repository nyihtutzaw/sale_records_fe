import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TableCell, TableRow } from '@mui/material';
import { setProduct } from '../../store/actions';
import PurchaseHistoryTable from './PurchaseHistoryTable';
import PurchaseForm from './PurchaseForm';

function PurchaseDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector((state) => state.product.product);

  const loadData = async () => {
    dispatch(setProduct(id));
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log(product);

  return (
    <Container>
        <PurchaseForm title="Purchase Form" data={product}/>
      <div>
        <h3>Purchase History</h3>
        <PurchaseHistoryTable
          tableBody={product?.product_purchases?.map((purchase, index) => (
            <TableRow
              key={purchase?.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="center">{purchase?.date}</TableCell>
              <TableCell align="center">{purchase?.initPrice}</TableCell>
              <TableCell align="center">{purchase?.wholeSalePrice}</TableCell>
              <TableCell align="center">{purchase?.price}</TableCell>
              <TableCell align="center">{purchase?.qty}</TableCell>
            </TableRow>
          ))}
        />
      </div>
    </Container>
  );
}

export default PurchaseDetails;
