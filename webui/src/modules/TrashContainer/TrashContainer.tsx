import { type NodeModel } from '@minoru/react-dnd-treeview';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import type { TreeDataValues } from '../NavigationMenu/types';
import { useTrashContainer } from './hooks';

const TrashContainer: React.FC = () => {
	const trashData: NodeModel<TreeDataValues>[] = useAppSelector((state) => state.trash);
	const { arrayToTree, renderTree } = useTrashContainer();
	const treeNodes = renderTree(arrayToTree(trashData));

	return (
		<Box sx={{ width: '100%', bgcolor: '#FFFFFF', margin: '3rem 6rem' }}>
			<Typography sx={(theme) => ({ color: theme.palette.textColor[80] })} variant={'h3'}>
				Deleted files
			</Typography>
			<Box component={'hr'} sx={(theme) => ({ border: `0.1rem thin ${theme.palette.textColor[40]}` })}></Box>
			<Box sx={{ mt: '1rem', width: '300px' }}>{treeNodes}</Box>
		</Box>
	);
};

export default TrashContainer;
