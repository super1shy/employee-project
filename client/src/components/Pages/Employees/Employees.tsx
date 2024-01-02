import React, { useEffect } from 'react';
import { Layout } from '../../Layout/Layout';
import { CustomButton } from '../../UI/Button';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { useGetAllEmployeesQuery } from '../../../store/services/employees';
import { ColumnsType } from 'antd/es/table';
import { Employee } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../paths';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/slices/authSlice';

const columns: ColumnsType<Employee> = [
  { title: 'Name', dataIndex: 'firstName', key: 'firstName' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
];

export const Employees = () => {
  const { data, isLoading } = useGetAllEmployeesQuery();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate, user]);

  const goToAddUser = () => {
    navigate(Paths.employeeAdd);
  };

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={goToAddUser}
        icon={<PlusCircleOutlined />}
      >
        Add Employee
      </CustomButton>
      <Table
        loading={isLoading}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};
