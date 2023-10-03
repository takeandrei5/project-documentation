import type { NodeModel } from '@minoru/react-dnd-treeview';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TreeDataValues } from '../../../modules/NavigationMenuModule/types';

const initialState: NodeModel<TreeDataValues>[] = [];

const treeSlice = createSlice({
	name: 'tree',
	initialState,
	reducers: {
		setTree: (state, action: PayloadAction<NodeModel<TreeDataValues>[]>) => {
			state.splice(0, state.length, ...action.payload);
		}
	}
});
export const { setTree } = treeSlice.actions;
export default treeSlice.reducer;
