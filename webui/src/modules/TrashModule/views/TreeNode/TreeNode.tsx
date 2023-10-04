import { Box, Icon, type Theme, Typography } from '@mui/material';
import type { TreeNodeProps } from './types';

const TreeNode: React.FC<TreeNodeProps> = ({ level, node, onRecoverFileClickedHandler, onPermanentDeleteClickedHandler }) => {
	return (
		<Box sx={{ marginLeft: `${20 * level}px`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
			<Typography variant={'smallRegular'}>{node.text}</Typography>

			<Box component={'span'}>
				<Icon
					sx={(theme: Theme) => ({
						color: theme.palette.greenDark[80],
						cursor: 'pointer',
						'&:hover': { color: theme.palette.greenDark[100] }
					})}
					onClick={() => onRecoverFileClickedHandler(node)}>
					undo
				</Icon>
				<Icon
					sx={(theme: Theme) => ({
						color: theme.palette.red[60],
						cursor: 'pointer',
						'&:hover': { color: theme.palette.red[80] }
					})}
					onClick={() => onPermanentDeleteClickedHandler(node)}>
					delete_forever_outlined
				</Icon>
			</Box>
		</Box>
	);
};

export default TreeNode;
