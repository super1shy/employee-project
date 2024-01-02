import { Employee } from '../../types/types';
import { api } from './api';

export type EmployeeData = Employee;

export const employeeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: '/employees',
        method: 'GET',
      }),
    }),

    getEmployee: builder.query<Employee, number>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'GET',
      }),
    }),

    editEmployee: builder.mutation<string, Employee>({
      query: (employee) => ({
        url: `/employees/${employee.id}`,
        method: 'PUT',
        body: employee,
      }),
    }),

    removeEmployee: builder.mutation<string, number>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
    }),

    addEmployee: builder.mutation<Employee, Employee>({
      query: (employee) => ({
        url: '/employees',
        method: 'POST',
        body: employee,
      }),
    }),
  }),
});

export const {
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useGetAllEmployeesQuery,
  useRemoveEmployeeMutation,
  useGetEmployeeQuery,
} = employeeApi;

export const {
  endpoints: {
    getAllEmployees,
    getEmployee,
    editEmployee,
    removeEmployee,
    addEmployee,
  },
} = employeeApi;
