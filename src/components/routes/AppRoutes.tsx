import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/AppMenu';
import Home from '../views/Home';
import Descarga from '../views/Descarga';
import Comparativo from '../views/Comparativo';
import Reemplazo from '../views/Reemplazo';

const AppRoutes: React.FC = () => {
  return (


    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

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
