// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chat/chatSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
