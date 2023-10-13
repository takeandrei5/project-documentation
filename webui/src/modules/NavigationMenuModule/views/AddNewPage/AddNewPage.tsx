import { Add } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React from 'react';
import type { AddNewPageProps } from './types';

const AddNewPage: React.FC<AddNewPageProps> = ({ onAddNewPageHandler }) => {
	return (
		<Box sx={{ position: 'relative' }}>
			<IconButton onClick={onAddNewPageHandler} size='small' sx={{ height: '1.25rem', width: '1.25rem' }}>
				<Add sx={{ fontSize: '1.25rem' }} />
			</IconButton>
		</Box>
	);
};
export default AddNewPage;
