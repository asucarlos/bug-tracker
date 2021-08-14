import { configureStore } from '@reduxjs/toolkit';
import bugReducer from './bug-slice';
import userReducer from './user-slice';
import uiReducer from './user-slice';

const store = configureStore({
  reducer: { bugs: bugReducer, user: userReducer, ui: uiReducer },
});

export default store;
