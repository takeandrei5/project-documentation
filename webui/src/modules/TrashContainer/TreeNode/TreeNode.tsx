import { Box } from '@mui/material';
import type { TreeNodeProps } from './types';

const TreeNode: React.FC<TreeNodeProps> = ({ treeNode }) => {
	const { text, data } = treeNode;

  if (!data || !data.isDeleted) {
    return null;
  }

	return <Box sx={{ width: '100%' }}>{text}</Box>;
};

export default TreeNode;
