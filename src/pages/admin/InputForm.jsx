import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent, Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as AdminService from '../../services/adminService';
import { FormItem } from '../../components/FormItem';
import { Input } from '../../components/Input';
import { VStack } from '../../components/VStack';
import { InputType } from '../../constants';
import { FlexAlignCenter } from '../../styles/common';
import BackButton from '../../components/Button/BackButton';

function InputForm({ editData }) {
  const navigate = useNavigate();
  const schema = yup
    .object()
    .shape({
      name: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: 1,
    },
  });

  const submit = useCallback(
    async (values) => {
      // eslint-disable-next-line no-unused-expressions
      editData
        ? await AdminService.update(values, editData.id)
        : await AdminService.store(values);
      reset();
      navigate('/admin');
    },
    [editData, navigate, reset],
  );

  useEffect(() => {
    if (editData) {
      reset({
        email: editData?.email,
        name: editData?.name,
        password: editData?.password,
      });
    } else {
      reset();
    }
  }, [editData, reset]);

  return (
    <FormPageWrapper>
      <BackButton route="/admin" />
      <Container maxWidth="sm">
        <StyledCard>
          <CardContent>
            <FlexAlignCenter $direction="column">
              <Box
                component="form"
                onSubmit={handleSubmit(submit)}
                sx={{ width: '100%' }}
              >
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
                    <FormItem label="Email">
                      <Input
                        registerProps={register('email')}
                        variant="outlined"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={errors.email?.message}
                        helperText={errors.email?.message}
                        inputType={InputType.text}
                        type="email"
                      />
                    </FormItem>
                    {!editData && (
                      <FormItem label="Password">
                        <Input
                          registerProps={register('password')}
                          variant="outlined"
                          name="password"
                          autoComplete="password"
                          autoFocus
                          error={errors.password?.message}
                          helperText={errors.password?.message}
                          inputType={InputType.text}
                        />
                      </FormItem>
                    )}
                  </VStack>

                  <Button type="submit" fullWidth variant="contained">
                    Submit
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
