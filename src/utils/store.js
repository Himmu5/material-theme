import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from '../slices/adminAuth';

const reducer = {
  adminAuth: adminAuthReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
