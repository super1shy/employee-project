import { Layout, Space, Typography } from 'antd';

import styles from './header.module.css';
import {
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { FC } from 'react';
import { CustomButton } from '../UI/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useAppSelector } from '../../store/hooks';
import { logout, selectUser } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';

export const Header: FC = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate(Paths.login);
  };

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to="/">
          <CustomButton type="ghost">
            <Typography.Title level={1}>Employees</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          type="ghost"
          icon={<LogoutOutlined />}
          onClick={onLogoutClick}
        >
          Logout
        </CustomButton>
      ) : (
        <Space>
          <Link to="/register">
            <CustomButton type="ghost" icon={<UserOutlined />}>
              Sign Up
            </CustomButton>
          </Link>
          <Link to="/login">
            <CustomButton type="ghost" icon={<LoginOutlined />}>
              Sign In
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
