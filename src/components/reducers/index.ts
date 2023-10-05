// reducers/index.ts

import { combineReducers } from 'redux';
import localStorageReducer from './localStorageReducer';

const rootReducer = combineReducers({
  localStorage: localStorageReducer,
  // Agrega otros reducers aquí si tienes más
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
