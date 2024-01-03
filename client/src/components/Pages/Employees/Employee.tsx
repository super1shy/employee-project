import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Descriptions, Divider, Space, Modal } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Navigate, Link } from 'react-router-dom';
import { Paths } from '../../../paths';
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from '../../../store/services/employees';
import { selectUser } from '../../../store/slices/authSlice';
import { isErrorWithMessage } from '../../../utils/IsErrorWithMessage';
import { Layout } from '../../Layout/Layout';
import { CustomButton } from '../../UI/Button';
import { ErrorMessage } from '../../UI/ErrorMessage';

export const Employee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <span>Загрузка</span>;
  }

  if (!data) {
    return navigate(Paths.home);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = async () => {
    hideModal();

    try {
      await removeEmployee(data.id).unwrap();

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
      <Descriptions title="Information about an employee" bordered>
        <Descriptions.Item
          label="Name"
          span={3}
        >{`${data.firstName} ${data.lastName}`}</Descriptions.Item>
        <Descriptions.Item label="Age" span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>
          {data.address}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Actions</Divider>
          <Space>
            <Link to={`${Paths.employeeEdit}/${data.id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={<EditOutlined />}
              >
                Update
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Delete
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Confirm delete action"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Confirm"
        cancelText="Cancel"
      >
        Are you sure you wan to delete current employee?
      </Modal>
    </Layout>
  );
};
