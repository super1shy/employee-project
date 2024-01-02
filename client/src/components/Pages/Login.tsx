import { Row, Card, Form, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { UserData, useLoginMutation } from '../../store/services/auth';
import { isErrorWithMessage } from '../../utils/IsErrorWithMessage';
import { PasswordInput } from '../UI/PasswordInput';
import { ErrorMessage } from '../UI/ErrorMessage';
import { CustomButton } from '../UI/Button';
import { Layout } from '../Layout/Layout';
import { CustomInput } from '../UI/Input';
import { Paths } from '../../paths';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const user = useSelector(selectUser);
  const [loginUser, loginUserResult] = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const login = async (data: UserData) => {
    try {
      // unwrap ~ json parse
      await loginUser(data).unwrap();
      navigate('/');
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
          <Form onFinish={login}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <CustomButton
              type="primary"
              htmlType="submit"
              // loading={loginUserResult.isLoading}
            >
              Sign In
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              No account? <Link to={Paths.register}>Sign Up</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
