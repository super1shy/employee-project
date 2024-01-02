import { Row } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../Layout/Layout';
import { Paths } from '../../../paths';
import { useAddEmployeeMutation } from '../../../store/services/employees';
import { selectUser } from '../../../store/slices/authSlice';
import { Employee } from '../../../types/types';
import { isErrorWithMessage } from '../../../utils/IsErrorWithMessage';
import { EmployeeForm } from '../../UI/EmployeeForm';

export const EmployeeAdd = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState('');
  const [addEmployee] = useAddEmployeeMutation();

  useEffect(() => {
    if (!user) {
      navigate(Paths.login);
    }
  }, [user, navigate]);

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap();
      navigate(Paths.home);
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
          onFinish={handleAddEmployee}
          title="Add Employee"
          btnText="Add"
          error={error}
          employee={undefined}
        />
      </Row>
    </Layout>
  );
};
