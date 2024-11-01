import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent, Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as productService from '../../services/productService';
import { FormItem } from '../../components/FormItem';
import { Input } from '../../components/Input';
import { VStack } from '../../components/VStack';
import { InputType } from '../../constants';
import { FlexAlignCenter } from '../../styles/common';
import { SET_LOADING } from '../../store/types/status'
import BackButton from '../../components/Button/BackButton';

function InputForm({ title,editData }) {
  const {loading} = useSelector((state) => state.status);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const schema = yup
    .object()
    .shape({
      name: yup.string().required(),
      price: yup.number().required('price is required').typeError('price is required'),
      initPrice: yup.number().required('InitPrice is required').typeError('InitPrice is required'),
      wholeSalePrice: yup.number().required('wholeSalePrice is required').typeError('wholeSalePrice is required'),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(schema), 
    defaultValues : {
      qty: 0
    }
  });


  useEffect(()=>{
    if (editData){
      reset({
        name:editData.name,
        price:editData.price,
        initPrice:editData.initPrice,
        wholeSalePrice:editData.wholeSalePrice,
        qty:editData.qty,
      })
    }
  },[editData, reset])


  const submit = useCallback(
    async (values) => {
       dispatch({
         type: SET_LOADING,
         payload: true,
       });
      // eslint-disable-next-line no-unused-expressions
      const status = editData
        ? await productService.update(values, editData?.id)
        : await productService.store(values);
       dispatch({
         type: SET_LOADING,
         payload: false,
       });

      if (status) {
        reset();
        navigate('/product');
      }
    },
    [dispatch, editData, navigate, reset],
  );


  const isDisabled = () => {
    if(loading) {
      return true;
    } 
    if(!isDirty) {
      return true;
    }
    return false;
  }

  console.log(errors);
  return (
    <FormPageWrapper>
      <BackButton route="/product" />
      <Container maxWidth="sm">
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
                  <VStack>
                    <FormItem label="Name">
                      <Input
                        registerProps={register('name')}
                        variant="outlined"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        error={errors.name?.message}
                        helperText={errors.name?.message}
                        inputType={InputType.text}
                      />
                    </FormItem>
                    <FormItem label="price">
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
                    <FormItem label="initPrice">
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
                    <FormItem label="wholeSalePrice">
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
            </FlexAlignCenter>
          </CardContent>
        </StyledCard>
      </Container>
    </FormPageWrapper>
  );
}
export default InputForm;

const FormPageWrapper = styled.div`
   width: 100%;
`;
const StyledCard = styled(Card)`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
`;
