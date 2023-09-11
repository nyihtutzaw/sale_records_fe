import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box } from '@mui/system';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { Modal } from '../../components/Modal';
import { VStack } from '../../components/VStack';
import { FormItem } from '../../components/FormItem';
import { InputType } from '../../constants';
import { Input } from '../../components/Input';
import {
  editSaleRecord,
  getCustomers,
  getPaymentMethods,
} from '../../store/actions';

export default function EditSaleRecordDialog({
  open,
  toggle,
  data
}) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.status);
  const paymentMethod = useSelector((state) => state.paymentMethod);
  const customer = useSelector((state) => state.customer);

  const schema = yup
    .object()
    .shape({
      customer_id: yup.number().required('Customer is required'),
      payment_method_id: yup.number().required('Payment method is required'),
      date: yup.string().required(),
    })
    .required();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue('date', data?.date);
    setValue('customer_id', data?.customer_id);
    setValue('payment_method_id', data?.payment_method_id);
  }, [data, setValue]);

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getPaymentMethods());
  }, []);

  const isDisabled = () => {
    if (loading) {
      return true;
    }
    if (!isDirty) {
      return true;
    }
    return false;
  };

  const customerOptions = customer?.customers?.map((eachCustomer) => ({
    value: eachCustomer?.id,
    label: eachCustomer?.name,
  }));
  const paymentMethodOptions = paymentMethod?.paymentMethods?.map(
    (eachpaymentMethod) => ({
      value: eachpaymentMethod?.id,
      label: eachpaymentMethod?.name,
    }),
  );

  const submit = useCallback(
    async (values) => {
      dispatch(
        editSaleRecord(data?.id, values, {
          date: values.date,
          Customer: customer?.customers?.find(
            (option) => option.id === values.customer_id,
          ),
          PaymentMethod: paymentMethod?.paymentMethods?.find(
            (option) => option.id === values.payment_method_id,
          ),
          ...values
        }),
      );
      reset({
        date: null,
        customer_id: null,
        payment_method_id: null,
      });
      toggle();
    },
    [data],
  );

  return (
    <Modal title="Edit Sale Record" open={open} onClose={toggle} buttons={[]}>
      <ModalContent>
        <Box
          component="form"
          onSubmit={handleSubmit(submit)}
          sx={{ width: '100%' }}
        >
          <VStack spacing={5}>
            <VStack>
              <FormItem label="Date">
                <Input
                  control={control}
                  registerProps={register('date')}
                  name="date"
                  inputType={InputType.date}
                  error={errors.date?.message}
                  helperText={errors.date?.message}
                  defaultValue={dayjs(new Date(data?.date))}
                />
              </FormItem>
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
            </VStack>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isDisabled()}
            >
              {loading ? 'Loading' : 'Submit'}
            </Button>
          </VStack>
        </Box>
      </ModalContent>
    </Modal>
  );
}
const ModalContent = styled.div`
  padding: 40px 0px;
`;
