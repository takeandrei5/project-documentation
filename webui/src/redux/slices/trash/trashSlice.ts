import type { NodeModel } from '@minoru/react-dnd-treeview';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TreeDataValues } from '../../../modules/NavigationMenuModule/types';

const initialState: NodeModel<TreeDataValues>[] = [];

const trashSlice = createSlice({
	name: 'trash',
	initialState,
	reducers: {
		setTrash: (state, action: PayloadAction<NodeModel<TreeDataValues>[]>) => {
			state.splice(0, state.length, ...action.payload);
		}
	}
});
export const { setTrash } = trashSlice.actions;
export default trashSlice.reducer;
