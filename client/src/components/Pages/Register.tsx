import { Row, Card, Form, Space, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Paths } from '../../paths';
import { CustomButton } from '../UI/Button';
import { CustomInput } from '../UI/Input';
import { PasswordInput } from '../UI/PasswordInput';
import { Layout } from '../Layout/Layout';
import { selectUser } from '../../store/slices/authSlice';
import { useRegisterMutation } from '../../store/services/auth';
import { User } from '../../types/types';
import { isErrorWithMessage } from '../../utils/IsErrorWithMessage';
import { ErrorMessage } from '../UI/ErrorMessage';

type RegisterData = User & { confirmPassword: string };

export const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState('');
  const [registerUser] = useRegisterMutation();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Sign In" style={{ width: '30rem' }}>
          <Form onFinish={register}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="confirmPassword"
            />

            <CustomButton
              type="primary"
              htmlType="submit"
              // loading={loginUserResult.isLoading}
            >
              Sign Up
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Have an account? <Link to={Paths.register}>Sign In</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
