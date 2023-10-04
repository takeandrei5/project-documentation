import { Box, Divider, Typography, type Theme } from '@mui/material';
import React from 'react';
import { useTrash } from './hooks';

const Trash: React.FC = () => {
	const { treeNodes } = useTrash();

	return (
		<Box sx={(theme: Theme) => ({ width: '100%', backgroundColor: theme.palette.common.white, padding: '2rem 4rem' })}>
			<Typography sx={(theme: Theme) => ({ color: theme.palette.textColor[80], fontSize: '2.5rem', lineHeight: '1.2', fontWeight: 700 })}>Deleted files</Typography>
			<Divider sx={(theme: Theme) => ({ borderColor: theme.palette.textColor[40] })} />
			<Box sx={{ mt: '1rem', width: '24rem' }}>{treeNodes}</Box>
		</Box>
	);
};

export default Trash;
