import { useCallback, useState } from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Table as MuiTable,
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled, { css } from 'styled-components';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingTableSkeleton from '../loading/TableLoading';
import { COLORS } from '../../styles/color';
import { HStack } from '../HStack';

export function Table({
  headers,
  rows,
  width = '100%',
  height = '65vh',
  loading = false,
  buttons,
  extraActionButtons,
}) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const location = useLocation();
  const navigate = useNavigate();
  const query = queryString.parse(location.search);
  const handleChangePage = useCallback(
    (_event, newPage) => {
      navigate(`${location.pathname}?page=${newPage}&limit=${rowsPerPage}`);
    },
    [location.pathname, navigate, rowsPerPage],
  );

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    navigate(
      `${location.pathname}?page=${
        query.page ? Number(query.page) : 1
      }&limit=${parseInt(event.target.value, 10)}`,
    );
  };

  return (
    <CardWrapper>
      {buttons && (
        <CardContent>
          <ButtonContainer>{buttons}</ButtonContainer>
        </CardContent>
      )}
      <CardContent>
        <TableWrapper $width={width}>
          <StyledTableContainer $height={height}>
            <MuiTable aria-label="simple table">
              <StickyTableHead>
                <TableRow>
                  {headers.map((header) => (
                    <StickyTableCell
                      key={`table-header-${header.value}`}
                      stickyLeft={header.stickyLeft}
                      stickyRight={header.stickyRight}
                    >
                      {header.label}
                    </StickyTableCell>
                  ))}
                  {extraActionButtons && (
                    <StickyTableCell>Actions</StickyTableCell>
                  )}
                </TableRow>
              </StickyTableHead>
              {loading && <LoadingTableSkeleton headers={headers} />}
              <TableBody>
                {rows?.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {headers.map((header) => (
                      <StickyTableCell
                        key={`table-body-${header.value}`}
                        stickyLeft={header.stickyLeft}
                        stickyRight={header.stickyRight}
                      >
                        {header.content
                          ? header.content(row[header.value], index)
                          : row[header.value]}
                      </StickyTableCell>
                    ))}

                    {extraActionButtons && (
                      <TableCell>
                        <HStack spacing={3}>
                          {extraActionButtons.map((btn) => (
                            <IconButton
                              key={btn.icon}
                              color={btn.color}
                              onClick={() => btn.onClick(row.id)}
                            >
                              {btn.icon}
                            </IconButton>
                          ))}
                        </HStack>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </StyledTableContainer>
        </TableWrapper>
      </CardContent>
      <TableFooter>
        <TablePagination
          component="div"
          count={rows.length}
          page={query.page ? Number(query.page) - 1 : 0}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableFooter>
    </CardWrapper>
  );
}

const CardWrapper = styled(Card)`
  width: 100%;
`;

const TableWrapper = styled(Paper)`
  //width: ${({ $width }) => $width};
  width: 100%;
  overflow: scroll;
`;

const StyledTableContainer = styled(TableContainer)`
  max-height: ${({ $height }) => $height};
`;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 20px;
`;

const StickyTableCell = styled(TableCell)`
  ${(props) =>
    props.stickyLeft &&
    props.stickyLeft >= 0 &&
    css`
      position: sticky;
      left: ${props.stickyLeft}px;
      z-index: 1;
      background-color: ${COLORS.CELL_COLOR};
    `}

  ${(props) =>
    props.stickyRight &&
    props.stickyRight >= 0 &&
    css`
      position: sticky;
      right: ${props.stickyRight}px;
      z-index: 1;
      background-color: ${COLORS.CELL_COLOR};
    `}
`;
const StickyTableHead = styled(TableHead)`
  position: sticky;
  top: 0;
  z-index: 3;
  background-color: ${COLORS.CELL_COLOR};
`;

const TableFooter = styled.div`
  padding: 0px 50px;
  display: flex;
  justify-content: flex-end;
`;
