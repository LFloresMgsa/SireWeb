

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Emp_cCodigo: localStorage.getItem('Emp_cCodigo') || '015',
  Pan_cAnio: localStorage.getItem('Pan_cAnio') || '2023',
  soft_cCodSoft: localStorage.getItem('soft_cCodSoft') || '001',
};

const localStorageSlice = createSlice({
  name: 'localStorage',
  initialState,
  reducers: {
    setEmpCodigo: (state, action) => {
      state.Emp_cCodigo = action.payload;
      localStorage.setItem('Emp_cCodigo', action.payload);
    },
    setPanAnio: (state, action) => {
      state.Pan_cAnio = action.payload;
      localStorage.setItem('Pan_cAnio', action.payload);
    },
    setSoftCodSoft: (state, action) => {
        state.soft_cCodSoft = action.payload;
        localStorage.setItem('soft_cCodSoft', action.payload);
      },
  
  },
});

export const { setEmpCodigo, setPanAnio, setSoftCodSoft } = localStorageSlice.actions;
export default localStorageSlice.reducer;
