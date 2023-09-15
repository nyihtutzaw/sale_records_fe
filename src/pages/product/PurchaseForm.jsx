import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent, Container, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import * as productService from '../../services/productService';
import { FormItem } from '../../components/FormItem';
import { Input } from '../../components/Input';
import { VStack } from '../../components/VStack';
import { InputType } from '../../constants';
import { FlexAlignCenter } from '../../styles/common';
import { SET_LOADING } from '../../store/types/status';
import BackButton from '../../components/Button/BackButton';

function PurchaseForm({ title, data }) {
  const { loading } = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup
    .object()
    .shape({
      date: yup.date().required(),
      price: yup
        .number()
        .required('price is required')
        .typeError('price is required'),
      initPrice: yup
        .number()
        .required('InitPrice is required')
        .typeError('InitPrice is required'),
      wholeSalePrice: yup
        .number()
        .required('wholeSalePrice is required')
        .typeError('wholeSalePrice is required'),
      qty: yup
        .number()
        .required('quantity is required')
        .typeError('quantity is required'),
    })
    .required();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      date: dayjs(new Date()),
      price: data.price,
      initPrice: data.initPrice,
      wholeSalePrice: data.wholeSalePrice,
    });
  }, [data, reset]);

  const submit = useCallback(
    // eslint-disable-next-line consistent-return
    async (values) => {
      if (!data?.id) {
        return null;
      }
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      // eslint-disable-next-line no-unused-expressions
      const status = await productService.storeProductPurchase({
        ...values,
        product_id: data?.id,
      });
      dispatch({
        type: SET_LOADING,
        payload: false,
      });

      if (status) {
        reset();
        navigate('/product');
      }
    },
    [dispatch, data, navigate, reset],
  );

  const isDisabled = () => {
    if (loading) {
      return true;
    }
    if (!isDirty) {
      return true;
    }
    return false;
  };

  return (
    <FormPageWrapper>
      <BackButton route="/product" />
      <Container maxWidth="lg">
        <StyledCard>
          <CardContent>
            <FlexAlignCenter $direction="column">
              <Box
                component="form"
                onSubmit={handleSubmit(submit)}
                sx={{ width: '100%' }}
              >
                <h3>{title}</h3>
                <VStack spacing={5}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item sm={4}>
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
                    <Grid item sm={4}>
                      <FormItem label="Price">
                        <Input
                          registerProps={register('price')}
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
                    <Grid item sm={4}>
                      <FormItem label="Init Price">
                        <Input
                          registerProps={register('initPrice')}
                          variant="outlined"
                          name="initPrice"
                          autoComplete="initPrice"
                          autoFocus
                          error={errors.initPrice?.message}
                          helperText={errors.initPrice?.message}
                          inputType={InputType.text}
                          type="number"
                        />
                      </FormItem>
                    </Grid>
                    <Grid item sm={4}>
                      <FormItem label="WholeSale Price">
                        <Input
                          registerProps={register('wholeSalePrice')}
                          variant="outlined"
                          name="wholeSalePrice"
                          autoComplete="wholeSalePrice"
                          autoFocus
                          error={errors.wholeSalePrice?.message}
                          helperText={errors.wholeSalePrice?.message}
                          inputType={InputType.text}
                          type="number"
                        />
                      </FormItem>
                    </Grid>
                    <Grid item sm={4}>
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
                  </Grid>
                  <ButtonWrapper>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isDisabled()}
                    >
                      {loading ? 'Loading' : 'Submit'}
                    </Button>
                  </ButtonWrapper>
                </VStack>
              </Box>
            </FlexAlignCenter>
          </CardContent>
        </StyledCard>
      </Container>
    </FormPageWrapper>
  );
}
export default PurchaseForm;

const FormPageWrapper = styled.div`
  width: 100%;
`;
const StyledCard = styled(Card)`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
