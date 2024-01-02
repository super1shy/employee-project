import { createSlice } from '@reduxjs/toolkit';
import { Employee } from '../../types/types';
import { employeeApi } from '../services/employees';
import { RootState } from '../store';

export interface IInitialState {
  employees: Employee[] | null;
}

const initialState: IInitialState = {
  employees: null,
};

export const employeesSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      employeeApi.endpoints.getAllEmployees.matchFulfilled,
      (state, action) => {
        state.employees = action.payload;
      }
    );
  },
});

export default employeesSlice.reducer;
export const selectEmployees = (state: RootState) =>
  state.employeesSlice.employees;
