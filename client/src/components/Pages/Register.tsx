import { Row, Card, Form, Space, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';
import { CustomButton } from '../UI/Button';
import { CustomInput } from '../UI/Input';
import { PasswordInput } from '../UI/PasswordInput';
import { Layout } from '../Layout/Layout';

export const Register = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Sign In" style={{ width: '30rem' }}>
          <Form /*onFinish={login}*/>
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
            {/* <ErrorMessage message={error} /> */}
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
