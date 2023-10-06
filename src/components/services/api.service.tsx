import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';
import Fetch from '../helpers/Fetch';

export const ApiService = {
  obtenerUsuario,
  obtenerToken,
  obtenerEmpresas,
  obtenerAnios,

};

function obtenerAnios(dataJson: any) {
  const url = 'https://localhost:44396/api/LOGIN/BuscarAnios';
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};


  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerEmpresas(dataJson: any) {
  const url = 'https://localhost:44396/api/LOGIN/BuscarEmpresas';
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};


  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}


function obtenerUsuario(dataJson: any) {
  const url = 'https://localhost:44396/api/LOGIN/ValidaIngreso';
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};


  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}


function obtenerToken(dataJson: any) {
  const url = 'https://localhost:44396/api/LOGIN';
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};


  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

