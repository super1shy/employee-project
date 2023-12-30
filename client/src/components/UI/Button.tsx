import { Form, Button as AntButton } from 'antd';
import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  type?: 'primary' | 'link' | 'text' | 'ghost' | 'default' | 'dashed';
  danger?: boolean;
  loading?: boolean;
  shape?: 'circle' | 'default' | 'round' | undefined;
  icon?: React.ReactNode;
};

export const CustomButton = ({
  children,
  type,
  danger,
  loading,
  htmlType = 'button',
  onClick,
  shape,
  icon,
}: Props) => {
  return (
    <Form.Item>
      <AntButton
        type={type}
        htmlType={htmlType}
        danger={danger}
        loading={loading}
        size="large"
        shape={shape}
        onClick={onClick}
        icon={icon}
      >
        {children}
      </AntButton>
    </Form.Item>
  );
};
