import styled from 'styled-components';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../components/Input';
import { InputType } from '../../constants';
import { FormItem } from '../../components/FormItem';
import {
  addProductToSaleRecords,
  editExistingProductInSaleRecords,
} from '../../store/actions';

export default function NewProductDialog({
  open,
  toggle,
  editData,
  setEditData,
}) {
  const saleRecordDetail = useSelector((state) => state.saleRecordDetail);
  const dispatch = useDispatch();

  const schema = yup
    .object()
    .shape({
      product_id: yup.number().required('Product is required'),
      price: yup.number().required('price is required').typeError('price is required'),
      qty: yup.number().required('qty is required').typeError('qty is required'),
    })
    .required();

  const defaultValues = {
      product_id: editData ? editData?.product_id : null,
      price: editData ? editData?.price : null,
      qty: editData ? editData?.qty : null,
    }

  const {
    control,
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const updatedPrice = watch('price');
  const updatedQty = watch('qty');

  let products = [];
  if (editData) {
    products = saleRecordDetail?.originProductOptions;
  } else {
    products = saleRecordDetail?.productOptions;
  }
  const productOptions = products?.map((product) => ({
    value: product?.id,
    label: product?.name,
  }));

  useEffect(() => {
    setValue('product_id', editData?.product_id);
    setValue('price', editData?.price);
    setValue('qty', editData?.qty);
  }, [editData, setValue]);

  const onSubmit = (data) => {
    if (editData) {
      dispatch(editExistingProductInSaleRecords(data));
      setEditData(null);
    } else {
      dispatch(addProductToSaleRecords(data));
    }
    reset(); 
    // toggle();
  };

  return (
    <Dialog
      open={open}
      onClose={toggle}
      fullWidth
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle>
        <Title>
          {editData ? `Edit Product (${editData?.name})` : 'Add New Product'}
        </Title>
      </DialogTitle>
      <ModalContent>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={6}>
            <FormItem label="Product">
              <Input
                registerProps={register('product_id')}
                control={control}
                options={productOptions}
                name="product_id"
                inputType={InputType.select}
                error={errors.product_id?.message}
                helperText="Product is required"
                disabled={editData}
                onValueChange={(e) => {
                  const selectedProduct = products.find(product => product?.id === e)
                  setValue('price', selectedProduct?.price)
                }}
              />
            </FormItem>
          </Grid>
          <Grid item xs={6}>
            <FormItem label="Price">
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
              />
            </FormItem>
          </Grid>
          <Grid item xs={6}>
            <FormItem label="Qty">
              <Input
                registerProps={register('qty')}
                variant="outlined"
                name="qty"
                autoComplete="qty"
                autoFocus
                error={errors.qty?.message}
                helperText={errors.qty?.message}
                inputType={InputType.text}
                type="number"
              />
            </FormItem>
          </Grid>
          <Grid item xs={6}>
            <FormItem label="Total">
              <Input
                variant="outlined"
                autoComplete="total"
                type="number"
                disabled
                value={updatedPrice * updatedQty}
              />
            </FormItem>
          </Grid>
        </Grid>
      </ModalContent>
      <DialogActions>
        <Button variant="contained" type="submit">
          submit
        </Button>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => {
            reset();
            toggle();
            setEditData(null);
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
const ModalContent = styled(DialogContent)`
  padding: 40px 0px;
`;
const Title = styled.span`
  font-weight: bold;
  font-size: 18px;
`;
