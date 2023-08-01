import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

import { FormItem } from '../components/FormItem';
import { Input } from '../components/Input';
import { VStack } from '../components/VStack';
import { InputType } from '../constants';
import { FlexAlignCenter } from '../styles/common';
import { educationOptions, genderOptions } from '../utils/options';

function FormPage() {
  const schema = yup
    .object()
    .shape({
      name: yup.string().required(),
      dob: yup.string().required(),
      education: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: 1,
    },
  });

  const submit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <FlexAlignCenter>
      <Container maxWidth="xl">
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
                    <Input
                      control={control}
                      name="married"
                      defaultValue={false}
                      label="Married"
                      inputType={InputType.check}
                    />
                    <FormItem label="Education">
                      <Input
                        control={control}
                        options={educationOptions}
                        name="education"
                        inputType={InputType.select}
                        error={errors.education?.message}
                        helperText={errors.education?.message}
                      />
                    </FormItem>
                    <FormItem label="Date Of Birth">
                      <Input
                        label="Date of birth"
                        name="dob"
                        control={control}
                        inputType={InputType.date}
                        format="YYYY-MM-DD"
                        error={errors.dob?.message}
                        helperText={errors.dob?.message}
                      />
                    </FormItem>

                    <Input
                      inputType={InputType.radio}
                      name="gender"
                      control={control}
                      label="Gender"
                      options={genderOptions}
                    />
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
    </FlexAlignCenter>
  );
}
export default FormPage;

const StyledCard = styled(Card)`
  margin-top: 20vh;
  min-height: 60vh;
  min-width: 60vh;
`;
