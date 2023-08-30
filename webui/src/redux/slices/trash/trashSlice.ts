import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NodeModel } from '@minoru/react-dnd-treeview';
import { TreeDataValues } from './types';

const initialState:NodeModel<TreeDataValues>[] = [];

const trashSlice = createSlice({
	name: 'trash',
	initialState,
	reducers: {
		setTrash: (state, { payload }:PayloadAction<TreeDataValues>) => {
			state.push(...payload);
		}
	}
});
export const { setTrash } = trashSlice.actions;
export default trashSlice.reducer;

