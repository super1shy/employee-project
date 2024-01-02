import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import { api } from './services/api';
import { listenerMiddleware } from '../middleware/auth';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
