import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Button,
  Card,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

import HomeIcon from '@mui/icons-material/Home';
import { Input } from './components/Input';
import { FlexAlignCenter } from './styles/common';

function LoginForm() {
  const schema = yup
    .object()
    .shape({
      email: yup.string().required(),
      password: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <FlexAlignCenter $height="100vh">
      <StyledCard>
        <UpperContainer>
          <StyledAvatar>
            <HomeIcon sx={{ color: '#2472fc', width: 60, height: 60 }} />
          </StyledAvatar>
        </UpperContainer>
        <LowerContainer>
          <ContentWrapper>
            <Card
              component="form"
              onSubmit={handleSubmit(submit)}
              sx={{
                width: '80%',
                padding: '10px 30px',
                 paddingBottom: '50px',
              }}
            >
              <Title>Login</Title>
              <ContentSpacing>
                <Input
                  registerProps={register('email')}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={Boolean(errors.password?.message)}
                  helperText={errors.email?.message}
                  inputType="textbox"
                />
                <Input
                  margin="normal"
                  fullWidth
                  name="password"
                  registerProps={register('password')}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  error={Boolean(errors.password?.message)}
                  helperText={errors.password?.message}
                  inputType="textbox"
                />
                <Input
                  value="showPassword"
                  color="primary"
                  inputType="checkbox"
                  label="Show Password"
                  onClick={() => {
                    setShowPassword((current) => !current);
                  }}
                />
              </ContentSpacing>
            </Card>
            <LoginButton type="submit" variant="contained">
              Log In
            </LoginButton>
          </ContentWrapper>
        </LowerContainer>
      </StyledCard>
    </FlexAlignCenter>
  );
}
export default LoginForm;

const StyledCard = styled(Card)`
  min-height: 90vh;
  min-width: 40vw;
  display: flex;
  flex-direction: column;

  @media (max-width: 992px) {
    min-width: 70vw;
  }
  @media (max-width: 576px) {
    min-width: 98%;
    min-height: 100vh;
  }
`;

const UpperContainer = styled.div`
  background: linear-gradient(to bottom, #2472fc, #6b0ac9);
  width: 100%;
  height: 45vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 576px) {
    min-height: 50vh;
  }
`;

const LowerContainer = styled.div`
  backgroundcolor: white;
  width: 100%;
  position: relative;
`;

const ContentWrapper = styled.div`
  width: 100%;
  zindex: 2;
  position: absolute;
  top: -60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 55vh;

  @media (max-width: 992px) {
    top: -160px;
  }
  @media (max-width: 576px) {
    top: -100px;
    height: 65vh;
  }
`;

const LoginButton = styled(Button)`
  && {
    background: #2472fc;
    postion: absolute;
    top: -20px;
    z-index: 5000;
    width: 70%;
    padding: 15px;
    border-radius: 30px;
    @media (max-width: 576px) {
      padding: 10px;
      top: -20px;
    }
  }
`;
const ContentSpacing = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px 0px;
  @media (max-width: 576px) {
    gap: 5px;
    padding: 0px;
  }
`;
const Title = styled.h3`
  color: gray;
  text-transform: uppercase;
  text-align: center;
`;

const StyledAvatar = styled(Avatar)`
  && {
    background-color: white;
    width: 120px;
    height: 120px;
  }
`;