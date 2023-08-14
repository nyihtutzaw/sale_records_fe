import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ProductTable({ tableBody, readOnly = false }) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="center">Product Name</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Qty</TableCell>
            <TableCell align="center">Total</TableCell>
            {!readOnly && <TableCell align="center">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>{tableBody}</TableBody>
      </Table>
    </TableContainer>
  );
}
