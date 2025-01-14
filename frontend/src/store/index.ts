import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';
import boardsReducer from './boardsSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    boards: boardsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 