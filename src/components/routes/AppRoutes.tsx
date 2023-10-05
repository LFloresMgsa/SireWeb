import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/AppMenu';
import Home from '../views/Home';
import Descarga from '../views/Descarga';
import Comparativo from '../views/Comparativo';
import Reemplazo from '../views/Reemplazo';
import Login from '../views/Login';
import Logout from '../views/Logout';

const AppRoutes: React.FC = () => {
  return (


    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/inicio" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/rvie" element={<Home />} />
      <Route path="/rvie/descarga" element={<Descarga />} />
      <Route path="/rvie/comparativo" element={<Comparativo />} />
      <Route path="/rvie/reemplazo" element={<Reemplazo />} />

      <Route path="/rce" element={<Home />} />
      <Route path="/rce/descarga" element={<Descarga />} />
      <Route path="/rce/comparativo" element={<Comparativo />} />
      <Route path="/rce/reemplazo" element={<Reemplazo />} />


    </Routes >



  );
};

export default AppRoutes;
