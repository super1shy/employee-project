import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Pages/Login';
import { Register } from './components/Pages/Register';
import { Employees } from './components/Pages/Employees/Employees';
import { EmployeeAdd } from './components/Pages/Employees/EmployeeAdd';
import { Paths } from './paths';
import { Employee } from './components/Pages/Employees/Employee';

function App() {
  return (
    <Routes>
      <Route path={Paths.login} element={<Login />}></Route>
      <Route path={Paths.register} element={<Register />}></Route>
      <Route path={Paths.home} element={<Employees />}></Route>
      <Route path={Paths.employeeAdd} element={<EmployeeAdd />}></Route>
      <Route path={`${Paths.employee}/:id`} element={<Employee />}></Route>
    </Routes>
  );
}

export default App;
