import { Typography } from '@mui/material';
import type { TreeNodeProps } from './types';

const TreeNode:React.FC<TreeNodeProps> = ({ treeNode }) => {
	const { text, data } = treeNode;

	if (!data || !data.isDeleted) {
		return null;
	}

	return <Typography variant={'smallRegular'}>{text}</Typography>;
};

export default TreeNode;
