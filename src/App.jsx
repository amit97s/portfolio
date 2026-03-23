import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./Home";
import Login from './Login';
import AdminDash from './AdminDash';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<AdminDash/>}/>
      </Routes>
    </BrowserRouter>
  );
}