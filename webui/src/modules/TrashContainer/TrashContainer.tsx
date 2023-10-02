import { type NodeModel } from '@minoru/react-dnd-treeview';
import { Box, type Theme, Typography, Divider } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import type { TreeDataValues } from '../NavigationMenuModule/types';
import { useTrashContainer } from './hooks';

const TrashContainer: React.FC = () => {
	const trashData: NodeModel<TreeDataValues>[] = useAppSelector((state) => state.trash);
	const { arrayToTree, renderTree } = useTrashContainer();
	const treeNodes = renderTree(arrayToTree(trashData));

	return (
		<Box sx={(theme: Theme) => ({ width: '100%', backgroundColor: theme.palette.common.white, padding: '2rem 4rem' })}>
			<Typography sx={(theme: Theme) => ({ color: theme.palette.textColor[80], fontSize: '2.5rem', lineHeight: '1.2', fontWeight: 700 })}>Deleted files</Typography>
			<Divider sx={(theme: Theme) => ({ borderColor: theme.palette.textColor[40] })} />
			<Box sx={{ mt: '1rem', width: '24rem' }}>{treeNodes}</Box>
		</Box>
	);
};

export default TrashContainer;
