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
import { useDispatch } from 'react-redux';
import { Input } from '../../components/Input';
import { InputType } from '../../constants';
import { FormItem } from '../../components/FormItem';
import {
  addProductToSaleRecords,
  editExistingProductInSaleRecords,
} from '../../store/actions';
import { debounceApiCall } from '../../services/debounceApiService';

export default function NewProductDialog({
  open,
  toggle,
  editData,
  setEditData,
}) {
  const dispatch = useDispatch();

  const schema = yup
    .object()
    .shape({
      product: yup.object().required('Product is required'),
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

  // const defaultValues = {
  //   product: editData
  //     ? { value: editData?.product_id, label: editData?.Product?.name }
  //     : null,
  //   price: editData ? editData?.price : null,
  //   qty: editData ? editData?.qty : null,
  // };

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
    // defaultValues,
  });

  const updatedPrice = watch('price');
  const updatedQty = watch('qty');

  const fetchProducts = async (input) => {
    try {
      let productOptions = [];
      const res = await debounceApiCall('search-product', `search=${input}`);
      if (res.data) {
        productOptions = res?.data?.map((product) => ({
          value: product?.id,
          label: product?.name,
          price: product?.price,
          name: product?.name,
        }));
      }
      return productOptions;
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    setValue('product', {
      value: editData?.product_id,
      name: editData?.name,
    });
    setValue('price', editData?.price);
    setValue('qty', editData?.qty);
  }, [editData, reset]);

  const onSubmit = (values) => {
    const data = {
      product_id: values?.product?.value,
      name: values?.product?.name,
      price: values?.price,
      qty: values?.qty,
    };
    if (editData) {
      dispatch(editExistingProductInSaleRecords(data));
      setEditData(null);
    } else {
      dispatch(addProductToSaleRecords(data));
    }
    reset({
      product: null,
      price: null,
      qty: null
    });
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
          {!editData && (
            <Grid item xs={6}>
              <FormItem label="Product">
                <Input
                  control={control}
                  rules={{ required: true }}
                  inputType={InputType.autocomplete}
                  name="product"
                  fetch={(input) => fetchProducts(input)}
                  onValueChange={(e) => {
                    console.log(e);
                    setValue('price', e?.price);
                  }}
                />
              </FormItem>
            </Grid>
          )}
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
