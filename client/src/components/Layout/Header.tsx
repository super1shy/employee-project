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
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';
import { useAppSelector } from '../../store/hooks';

export const Header: FC = () => {
  // const user = useAppSelector(() => )
  const user = false;
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to="/">
          <CustomButton type="ghost">
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          type="ghost"
          icon={<LogoutOutlined />}
          // onClick={onLogoutClick}
        >
          Выйти
        </CustomButton>
      ) : (
        <Space>
          <Link to="/register">
            <CustomButton type="ghost" icon={<UserOutlined />}>
              Зарегистрироваться
            </CustomButton>
          </Link>
          <Link to="/login">
            <CustomButton type="ghost" icon={<LoginOutlined />}>
              Войти
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
