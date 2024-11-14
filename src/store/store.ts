// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chat/chatSlice';
import userReducer from './user/userSlice';
import postReducer from './post/postSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth: userReducer,
    post: postReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
