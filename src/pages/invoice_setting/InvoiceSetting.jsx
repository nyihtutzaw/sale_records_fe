import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent, Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as invoiceSettingService from '../../services/invoiceSettingService';
import { FormItem } from '../../components/FormItem';
import { Input } from '../../components/Input';
import { VStack } from '../../components/VStack';
import { InputType } from '../../constants';
import { FlexAlignCenter } from '../../styles/common';
import { SET_LOADING } from '../../store/types/status';
import BackButton from '../../components/Button/BackButton';
import { setInvoiceSetting } from '../../store/actions';

function InvoiceSetting() {
  const { loading } = useSelector((state) => state.status);
  const { invoiceSetting } = useSelector((state) => state.invoiceSetting);

  const dispatch = useDispatch();

  const loadData = async () => {
    dispatch(setInvoiceSetting());
  };
  useEffect(() => {
    loadData();
  }, []);

  const schema = yup
    .object()
    .shape({
      company_name: yup.string().required(),
      phone: yup.string().required(),
      address: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (invoiceSetting) {
      reset({
        company_name: invoiceSetting.company_name,
        phone: invoiceSetting.phone,
        address: invoiceSetting.address,
        notes: invoiceSetting.notes,
      });
    }
  }, [invoiceSetting, reset]);

  const submit = useCallback(
    async (values) => {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      await invoiceSettingService.update(values, invoiceSetting?.id);
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
    },
    [invoiceSetting?.id, dispatch],
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
      <Container maxWidth="sm">
        <StyledCard>
          <CardContent>
            <FlexAlignCenter $direction="column">
              <Box
                component="form"
                onSubmit={handleSubmit(submit)}
                sx={{ width: '100%' }}
              >
                <h3>Invoice Setting</h3>
                <VStack spacing={5}>
                  <VStack>
                    <FormItem label="Name">
                      <Input
                        registerProps={register('company_name')}
                        variant="outlined"
                        name="company_name"
                        autoComplete="company_name"
                        autoFocus
                        error={errors.company_name?.message}
                        helperText={errors.company_name?.message}
                        inputType={InputType.text}
                      />
                    </FormItem>
                    <FormItem label="Phone">
                      <Input
                        registerProps={register('phone')}
                        variant="outlined"
                        name="phone"
                        autoComplete="phone"
                        autoFocus
                        error={errors.phone?.message}
                        helperText={errors.phone?.message}
                        inputType={InputType.text}
                      />
                    </FormItem>
                    <FormItem label="Address">
                      <Input
                        registerProps={register('address')}
                        variant="outlined"
                        name="address"
                        autoComplete="address"
                        autoFocus
                        error={errors.address?.message}
                        helperText={errors.address?.message}
                        inputType={InputType.text}
                        type="textarea"
                      />
                    </FormItem>
                    <FormItem label="Notes">
                      <Input
                        registerProps={register('notes')}
                        variant="outlined"
                        name="notes"
                        autoComplete="notes"
                        autoFocus
                        error={errors.notes?.message}
                        helperText={errors.notes?.message}
                        inputType={InputType.text}
                        type="textarea"
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
export default InvoiceSetting;

const FormPageWrapper = styled.div`
  width: 100%;
`;
const StyledCard = styled(Card)`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
`;
