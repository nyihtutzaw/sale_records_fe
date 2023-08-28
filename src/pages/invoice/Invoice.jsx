import React, { useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { setSaleRecord } from '../../store/actions';
import { calculateSaleTotal } from '../../utils/calculateSaleTotal';

function InvoicePage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    const saleRecord = useSelector((state) => state.saleRecord.saleRecord);
  
    const loadData = async () => {
      dispatch(setSaleRecord(id));
    };
  
    useEffect(() => {
      loadData();
    }, []);

  return (
    <PageContainer>
      <InvoicePaper elevation={3}>
        <Row>
          <Typography variant="h4" gutterBottom>
            Company Name
          </Typography>
          <div>
            <Typography variant="subtitle1">From:</Typography>
            <Typography variant="body1">Your Company Name</Typography>
            <Typography variant="body1">123 Main Street, City</Typography>
            <Typography variant="body1">Country, Postal Code</Typography>
          </div>
        </Row>
        <Row>
          <div>
            <Typography variant="subtitle1">To: </Typography>
            <Typography variant="body1">{saleRecord?.Customer?.name}</Typography>
            <Typography variant="body1">{saleRecord?.Customer?.phone}</Typography>
            <Typography variant="body1">{saleRecord?.Customer?.address}</Typography>
            
          </div>
          <div>
            <Typography variant="body1">
              Invoice Date: {dayjs(saleRecord?.date).format('DD/MM/YYYY')}
            </Typography>
          </div>
        </Row>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {saleRecord?.sale_record_details?.map((item) => (
                <TableRow key={`${item.name}/${item.id}`}>
                  <TableCell>{item?.Product?.name}</TableCell>
                  <TableCell align="right">{item?.qty}</TableCell>
                  <TableCell align="right">${item?.price}</TableCell>
                  <TableCell align="right">
                    ${item.qty * item.price}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <strong>Total Amount:</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>${calculateSaleTotal(saleRecord?.sale_record_details)}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body" style={{ marginTop: 20 }}>
          Notes - 
        </Typography>
      </InvoicePaper>
    </PageContainer>
  );
}

export default InvoicePage;

const PageContainer = styled(Container)`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const InvoicePaper = styled(Paper)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 576px) {
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }
`;
