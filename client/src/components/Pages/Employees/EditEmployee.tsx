import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from '../../../store/services/employees';
import { Paths } from '../../../paths';
import { Layout } from '../../Layout/Layout';
import { Row } from 'antd';
import { EmployeeForm } from '../../UI/EmployeeForm';
import { Employee } from '../../../types/types';
import { isErrorWithMessage } from '../../../utils/IsErrorWithMessage';

export const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: number }>();
  const [error, setError] = useState('');
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [editEmployee] = useEditEmployeeMutation();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!data) {
    navigate(Paths.home);
  }

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };

      await editEmployee(editedEmployee).unwrap();

      navigate(`${Paths.employee}/${params.id}`);
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
        <EmployeeForm
          title="Update an employee"
          btnText="Update"
          error={error}
          employee={data}
          onFinish={handleEditUser}
        ></EmployeeForm>
      </Row>
    </Layout>
  );
};
