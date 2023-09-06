import { configureStore } from '@reduxjs/toolkit';
import trashSlice from './slices/trash/trashSlice';

const rootReducer = {
	trash: trashSlice
};

export const store = configureStore({
	reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
