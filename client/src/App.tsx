import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Pages/Login';
import { Register } from './components/Pages/Register';
import { Home } from './components/Pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
