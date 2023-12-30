import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
