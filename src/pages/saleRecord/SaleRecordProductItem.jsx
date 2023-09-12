import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Input } from '../../components/Input';
import { InputType } from '../../constants';
import * as saleRecordService from '../../services/saleRecordService';
import useDialog from '../../hooks/useDialog';
import { getSaleRecords } from '../../store/actions';

function SaleRecordProductItem({ row, index, toggle, total }) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const schema = yup
    .object()
    .shape({
      price: yup
        .number()
        .required('price is required')
        .typeError('price is required'),
      qty: yup
        .number()
        .required('qty is required')
        .typeError('qty is required'),
    })
    .required();
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      price: row ? row?.price : null,
      qty: row ? row?.qty : null,
    },
  });

  const updatedPrice = watch('price');
  const updatedQty = watch('qty');

  const onSubmit = async (data) => {
    try {
      await saleRecordService.updateSaleRecordItem(data, row?.id);
      dispatch(getSaleRecords());
      reset();
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleEditMode = () => {
    setIsEdit((prev) => !prev);
    reset();
  };

  const { showConfirmDialog, closeConfirmDialog } = useDialog();

  const handleDelete = async () => {
    try {
      await saleRecordService.deleteSaleRecordItem(row?.id);
    } catch (error) {
      console.log(error);
    }
    closeConfirmDialog();
    toggle();
  };

  return (
    <TableRow
      key={row?.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell align="center">{row?.Product?.name}</TableCell>

      <TableCell align="center">
        {isEdit ? (
          <Input
            registerProps={register('price', { required: true })}
            variant="outlined"
            name="price"
            autoComplete="price"
            autoFocus
            error={errors.price?.message}
            helperText={errors.price?.message}
            inputType={InputType.text}
            type="number"
            sx={{
              maxWidth: '80px',
            }}
          />
        ) : (
          row.price
        )}
      </TableCell>

      <TableCell align="center">
        {isEdit ? (
          <Input
            registerProps={register('qty', { required: true })}
            variant="outlined"
            name="qty"
            autoComplete="qty"
            autoFocus
            error={errors.qty?.message}
            helperText={errors.qty?.message}
            inputType={InputType.text}
            type="number"
            sx={{
              maxWidth: '80px',
            }}
          />
        ) : (
          row.qty
        )}
      </TableCell>

      <TableCell align="center">
        {isEdit ? (
          <Input
            variant="outlined"
            autoComplete="total"
            type="number"
            disabled
            value={updatedPrice * updatedQty}
            sx={{
              maxWidth: '80px',
            }}
          />
        ) : (
          row.price * row.qty
        )}
      </TableCell>
      <TableCell align="center">
        <Row>
          {isEdit ? (
            <>
              {isDirty && (
                <CheckIcon color="success" onClick={handleSubmit(onSubmit)} />
              )}
              <CloseIcon color="error" onClick={toggleEditMode} />
            </>
          ) : (
            <Row>
              <EditIcon color="primary" onClick={toggleEditMode} />
              {total > 1 && (
                <DeleteIcon
                  color="error"
                  onClick={() => {
                    showConfirmDialog({
                      title: 'Delete Sale Product Item',
                      body: 'Are you sure to delete?',
                      onConfirm: () => handleDelete(),
                      cancelLabel: 'Cancel',
                      acceptLabel: 'Confirm',
                    });
                  }}
                />
              )}
            </Row>
          )}
        </Row>
      </TableCell>
    </TableRow>
  );
}

export default SaleRecordProductItem;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  cursor: pointer;
`;
