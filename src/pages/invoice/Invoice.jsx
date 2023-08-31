import React, { useEffect, useRef, useState } from 'react';
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
  Button,
} from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ReactToPrint from 'react-to-print';
import { setInvoiceSetting, setSaleRecord } from '../../store/actions';
import { calculateSaleTotal } from '../../utils/calculateSaleTotal';

function InvoicePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const componentRef = useRef();
  const [isCopied, setIsCopied] = useState(false);

  const saleRecord = useSelector((state) => state.saleRecord.saleRecord);
  const invoiceSetting = useSelector(
    (state) => state.invoiceSetting.invoiceSetting,
  );

  const loadData = async () => {
    dispatch(setSaleRecord(id));
    dispatch(setInvoiceSetting());
  };

  useEffect(() => {
    loadData();
  }, []);

  const copyTextToClipboard = async () => {
    if(!isCopied) {
      setIsCopied(true)
    }
    const currentPath = window.location.href;
    if ('clipboard' in navigator) {
     await navigator.clipboard.writeText(currentPath);
    }
  };

  return (
    <PageContainer>
      <ButtonContainer>
        <Button variant="contained" onClick={copyTextToClipboard} size='small'>
            {isCopied ? 'copied' : 'copy link'}
        </Button>
        <ReactToPrint
          // eslint-disable-next-line react/no-unstable-nested-components
          trigger={() => <Button variant="contained" color='secondary' size='small'>Print</Button>}
          content={() => componentRef.current}
        />
      </ButtonContainer>
      <Paper>
         <InvoicePaper elevation={3} ref={componentRef}>
        <Row>
          <Typography variant="h4" gutterBottom>
            {invoiceSetting?.company_name}
          </Typography>
          <div>
            <Typography variant="subtitle1">From:</Typography>
            <Typography variant="body1">
              {' '}
              {invoiceSetting?.company_name}
            </Typography>
            <Typography variant="body1"> {invoiceSetting?.phone}</Typography>
            <Typography variant="body1"> {invoiceSetting?.address}</Typography>
          </div>
        </Row>
        <Row>
          <div>
            <Typography variant="subtitle1">To: </Typography>
            <Typography variant="body1">
              {saleRecord?.Customer?.name}
            </Typography>
            <Typography variant="body1">
              {saleRecord?.Customer?.phone}
            </Typography>
            <Typography variant="body1">
              {saleRecord?.Customer?.address}
            </Typography>
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
                  <TableCell align="right">${item.qty * item.price}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <strong>Total Amount:</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>
                    ${calculateSaleTotal(saleRecord?.sale_record_details)}
                  </strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body" style={{ marginTop: 20 }}>
          Notes - {invoiceSetting?.notes}
        </Typography>
      </InvoicePaper>
      </Paper>
     
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

const InvoicePaper = styled.div`
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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 5px;
  margin-bottom: 10px;
`;
