import { useCallback, useState } from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Table as MuiTable,
  Typography,
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
import { useSelector } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LoadingTableSkeleton from '../loading/TableLoading';
import { COLORS } from '../../styles/color';
import { HStack } from '../HStack';

export function Table({
  headers,
  rows,
  width = '100%',
  height = '65vh',
  buttons,
  total,
  extraActionButtons,
  isActionButtonsCollpase = false,
  bottomLabelText,
  bottomLabelValue,
}) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const location = useLocation();
  const navigate = useNavigate();
  const query = queryString.parse(location.search);
  const handleChangePage = useCallback(
    (_event, newPage) => {
      navigate(`${location.pathname}?page=${newPage + 1}&limit=${rowsPerPage}`);
    },
    [location.pathname, navigate, rowsPerPage],
  );
  const status = useSelector((state) => state.status);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    navigate(
      `${location.pathname}?page=${
        query.page ? Number(query.page) : 1
      }&limit=${parseInt(event.target.value, 10)}`,
    );
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
                      // eslint-disable-next-line react/no-array-index-key
                      key={`table-header-${header?.value}`}
                      stickyleft={header.stickyLeft}
                      stickyright={header.stickyRight}
                    >
                      {header.label}
                    </StickyTableCell>
                  ))}
                  {extraActionButtons && (
                    <StickyTableCell>Actions</StickyTableCell>
                  )}
                </TableRow>
              </StickyTableHead>
              {status?.loading ? (
                <LoadingTableSkeleton headers={headers} />
              ) : (
                <TableBody>
                  {rows?.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {headers.map((header) => (
                        <StickyTableCell
                          // eslint-disable-next-line react/no-array-index-key
                          key={`table-body-${header?.value}`}
                          stickyleft={header.stickyLeft}
                          stickyright={header.stickyRight}
                        >
                          {header.content
                            ? header.content(header.value ? row[header.value] : row, index)
                            : row[header.value]}
                        </StickyTableCell>
                      ))}

                      {extraActionButtons && (
                        <TableCell>
                          {isActionButtonsCollpase ? (
                            <>
                              <IconButton onClick={handleClick}>
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                elevation={1}
                              >
                                {extraActionButtons.map((btn) => (
                                  <MenuItem key={btn.key}>
                                    <IconButton
                                      key={btn.key}
                                      color={btn.color}
                                      onClick={() => {
                                        handleClose();
                                        btn.onClick(row.id);
                                      }}
                                    >
                                      {btn.icon}
                                    </IconButton>
                                  </MenuItem>
                                ))}
                              </Menu>
                            </>
                          ) : (
                            <HStack spacing={3}>
                              {extraActionButtons.map((btn) => (
                                <IconButton
                                  key={btn.key}
                                  color={btn.color}
                                  onClick={() => btn.onClick(row.id)}
                                >
                                  {btn.icon}
                                </IconButton>
                              ))}
                            </HStack>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </MuiTable>
          </StyledTableContainer>
        </TableWrapper>
      </CardContent>

      <TableFooter
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {bottomLabelText && (
          <TotalText>
            {bottomLabelText} - {bottomLabelValue || total}
          </TotalText>
        )}
        {total && (
          <TablePagination
            component="div"
            count={total || 0}
            // page={query.page ? Number(query.page) : 0}
            page={query.page ? Number(query.page) - 1 : 0}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
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
    props.stickyleft &&
    props.stickyleft >= 0 &&
    css`
      position: sticky;
      left: ${props.stickyleft}px;
      z-index: 1;
      background-color: ${COLORS.CELL_COLOR};
    `}

  ${(props) =>
    props.stickyright &&
    props.stickyright >= 0 &&
    css`
      position: sticky;
      right: ${props.stickyright}px;
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

const TotalText = styled(Typography)`
  && {
    margin-bottom: 10px;
    text-align: right;
    padding-right: 15px;
    font-weight: bold;
  }
`;
