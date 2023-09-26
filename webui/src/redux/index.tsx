import { configureStore } from '@reduxjs/toolkit';
import trashSlice from './slices/trash/trashSlice';
import treeSlice from './slices/tree/treeSlice';

const rootReducer = {
	trash: trashSlice,
	tree: treeSlice
};

export const store = configureStore({
	reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
