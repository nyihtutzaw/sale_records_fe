import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { useCallback, useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Delete, Edit } from '@mui/icons-material';
import dayjs from 'dayjs';
import { FormItem } from '../../components/FormItem';
import { InputType } from '../../constants';
import { FlexAlignCenter } from '../../styles/common';
import ProductTable from './ProductTable';
import NewProductDialog from './NewProductDialog';
import { Input } from '../../components/Input';
import { getCustomers, getDeliveryMethods, getPaymentMethods } from '../../store/actions';
import {
  deleteProductInSaleRecords,
  getProductOptions,
} from '../../store/actions/saleRecordDetail';
import { SET_LOADING } from '../../store/types/status';
import *  as saleRecordService from '../../services/saleRecordService'

function CreateSaleRecord() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState(false);
  const { loading } = useSelector((state) => state.status);
  const customer = useSelector((state) => state.customer);
  const paymentMethod = useSelector((state) => state.paymentMethod);
  const deliveryMethod = useSelector((state) => state.deliveryMethod);
  const saleRecordDetail = useSelector((state) => state.saleRecordDetail);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup
    .object()
    .shape({
      customer_id: yup.number().required('Customer is required'),
      // product: yup.object().required('Product is required'),
      payment_method_id: yup.number().required('Payment method is required'),
      delivery_method_id: yup.number().required('delivery method is required'),
      // date: yup.string().required(),
    })
    .required();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: dayjs(new Date())
    }
  });

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getPaymentMethods());
    dispatch(getDeliveryMethods());
  }, []);

  const loadProducts = async () => {
    dispatch(getProductOptions());
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const customerOptions = customer?.customers?.map((eachCustomer) => ({
    value: eachCustomer?.id,
    label: eachCustomer?.name,
  }));
  const paymentMethodOptions = paymentMethod?.paymentMethods?.map((eachpaymentMethod) => ({
    value: eachpaymentMethod?.id,
    label: eachpaymentMethod?.name,
  }));
  const deliveryMethodOptions = deliveryMethod?.deliveryMethods?.map((eachdeliveryMethod) => ({
    value: eachdeliveryMethod?.id,
    label: eachdeliveryMethod?.name,
  }));

  const submit = useCallback(async (values) => {
    if (saleRecordDetail?.saleRecordDetails?.length > 0) {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      // eslint-disable-next-line no-unused-expressions
      const status = await saleRecordService.store({
        ...values,
        sale_record_details: saleRecordDetail?.saleRecordDetails,
      });
      dispatch({
        type: SET_LOADING,
        payload: false,
      });

      if (status) {
        reset();
        navigate('/sale-record-list');
      }
      return;
    }
    setError(true);
  }, [dispatch, navigate, reset, saleRecordDetail?.saleRecordDetails]);

  useEffect(() => {
    if (error && saleRecordDetail?.saleRecordDetails?.length > 0) {
      setError(false);
    }
  }, [error, saleRecordDetail?.saleRecordDetails]);

  useEffect(() => {
    reset();
  }, [reset]);

  const toggle = () => {
    setOpenDialog((prevOpen) => !prevOpen);
  };
  const handleOpenEdit = (product) => {
    setEditData(product);
    setOpenDialog((prevOpen) => !prevOpen);
  };

  const removeProductInSaleRecords = (id) => {
    dispatch(deleteProductInSaleRecords(id));
  };

  return (
    <FormPageWrapper>
      <Container maxWidth="md">
        <StyledCard component="form" onSubmit={handleSubmit(submit)}>
          <CardContent>
            <FlexAlignCenter $direction="column">
              <Box sx={{ width: '100%' }}>
                <h3>Create Sale Record</h3>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs={12} sm={4}>
                    <FormItem label="Date">
                      <Input
                       control={control}
                        registerProps={register('date')}
                        name="date"
                        inputType={InputType.date}
                        error={errors.date?.message}
                        helperText={errors.date?.message}
                       defaultValue={dayjs(new Date())}
                      />
                    </FormItem>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormItem label="Customer">
                      <Input
                        control={control}
                        options={customerOptions}
                        registerProps={register('customer_id')}
                        name="customer_id"
                        inputType={InputType.select}
                        error={errors.customer_id?.message}
                        helperText={errors.customer_id?.message}
                      />
                    </FormItem>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormItem label="Payment Method">
                      <Input
                        control={control}
                        options={paymentMethodOptions}
                        registerProps={register('payment_method_id')}
                        name="payment_method_id"
                        inputType={InputType.select}
                        error={errors.payment_method_id?.message}
                        helperText={errors.payment_method_id?.message}
                      />
                    </FormItem>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormItem label="Delivery Method">
                      <Input
                        control={control}
                        options={deliveryMethodOptions}
                        registerProps={register('delivery_method_id')}
                        name="delivery_method_id"
                        inputType={InputType.select}
                        error={errors.delivery_method_id?.message}
                        helperText={errors.delivery_method_id?.message}
                      />
                    </FormItem>
                  </Grid>
                  <Grid item sm={4}>
                    <Button
                      type="button"
                      color="secondary"
                      fullWidth
                      variant="contained"
                      onClick={toggle}
                    >
                      Add New Product
                    </Button>
                    {error && <Error>Please add products</Error>}
                  </Grid>
                </Grid>

                <ProductTable
                  tableBody={saleRecordDetail?.saleRecordDetails?.map(
                    (row, index) => (
                      <TableRow
                        key={row?.product_id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">{row?.name}</TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">{row.qty}</TableCell>
                        <TableCell align="center">
                          {row.price * row.qty}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenEdit(row)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() =>
                              removeProductInSaleRecords(row.product_id)
                            }
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                />
              </Box>
            </FlexAlignCenter>
          </CardContent>
          <Box
            sx={{
              marginTop: 'auto',
              display: 'flex',
              justifyContent: 'center',
              padding: '10px',
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                width: '200px',
                marginTop: 'auto',
              }}
            >
              {loading ? 'Loading' : 'Submit'}
            </Button>
          </Box>
        </StyledCard>
      </Container>
      <NewProductDialog
        open={openDialog}
        toggle={toggle}
        editData={editData}
        setEditData={setEditData}
      />
    </FormPageWrapper>
  );
}
export default CreateSaleRecord;

const FormPageWrapper = styled.div`
  width: 100%;
`;
const Error = styled.span`
  color: red;
  font-size: 15px;
`;
const StyledCard = styled(Card)`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
`;
