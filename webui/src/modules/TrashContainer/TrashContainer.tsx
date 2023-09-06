import { type NodeModel } from '@minoru/react-dnd-treeview';
import { Box } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';
import type { TreeDataValues } from '../NavigationMenu/types';
import { useTrashContainer } from './hooks';
import React from 'react';

const TrashContainer: React.FC = () => {
	const trashData: NodeModel<TreeDataValues>[] = useAppSelector((state) => state.trash);
	const { arrayToTree, renderTree } = useTrashContainer();

	const treeNodes = renderTree(arrayToTree(trashData));

	return (
		<Box sx={{ height: '100%', width: '100%', bgcolor: '#FFFFFF' }}>
			{treeNodes}
		</Box>
	);
};

export default TrashContainer;
