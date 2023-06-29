import { configureStore } from '@reduxjs/toolkit';
import inputReducer from '../features/inputSlice';
import monthReducer from '../features/monthSlice';


export const store = configureStore({
  reducer: {
    input: inputReducer,
    month: monthReducer, 
  },
});
