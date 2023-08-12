import React from 'react';
import styled from 'styled-components';
import {
  TableBody,
  TableCell,
  TableRow,
  Skeleton,
  TableContainer,
} from '@mui/material';

function LoadingTableSkeleton({ headers }) {
  const rows = Array.from(Array(10).keys());

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row}>
          {headers.map((header) => (
            <TableCell key={header?.value}>
              <Skeleton variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

export default LoadingTableSkeleton;

export const TableLayout = styled(TableContainer)`
  && {
    margin: 20px;
    min-width: 650px;
    max-width: 1100px;
  }
`;
