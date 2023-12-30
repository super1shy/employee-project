import { Button, Layout, Space, Typography } from 'antd';

import styles from './header.module.css';
import { TeamOutlined } from '@ant-design/icons';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon}></TeamOutlined>
        <Button type="link">Click</Button>
      </Space>
    </Layout.Header>
  );
};
