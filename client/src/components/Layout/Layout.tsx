import { FC, ReactNode } from 'react';
import { Layout as AntLayout } from 'antd';

import styles from './layout.module.css';
import { Header } from './Header';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.main}>
      <Header />
      <AntLayout.Content style={{ height: '100%' }}>
        {children}
      </AntLayout.Content>
    </div>
  );
};
