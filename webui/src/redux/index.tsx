import { configureStore } from '@reduxjs/toolkit';
import treeSlice from './slices/tree/treeSlice';

const rootReducer = {
	tree: treeSlice
};

export const store = configureStore({
	reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
