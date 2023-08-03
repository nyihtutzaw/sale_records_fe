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
      price: yup.number().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: editData ? editData?.name : null,
      price: editData ? editData?.price : null,
    },
  });


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
    [editData],
  );

  useEffect(() => {
    if (editData) {
      reset({
        name: editData?.name,
      });
    } else {
      reset();
    }
  }, [editData, reset]);

  const isDisabled = () => {
    if(loading) {
      return true;
    } 
    if(!isDirty) {
      return true;
    }
    return false;
  }
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
  min-height: 60vh;
  min-width: 60vh;
`;