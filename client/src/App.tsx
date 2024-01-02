import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Pages/Login';
import { Register } from './components/Pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}

export default App;
