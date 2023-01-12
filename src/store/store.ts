import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { boardsReducer } from './boards.slice';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
