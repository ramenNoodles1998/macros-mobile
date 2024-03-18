import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import macrosSliceReducer from '../feature/macro-slice';

export const store = configureStore({
  reducer: {
    macrosSliceReducer: macrosSliceReducer,
  },
});
