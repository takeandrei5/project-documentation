import { useDragOver } from '@minoru/react-dnd-treeview';
import { Box } from '@mui/material';
import { AddNewFile } from '../AddNewFile';
import EditNode from '../EditNode/EditNode';
import { VerticalMenu } from '../VerticalMenu';
import type { TreeNodeProps } from './types';

const TreeNode: React.FC<TreeNodeProps> = ({ node, treeData, setTreeData, onClickHandler, onToggle, depth, isOpen, isSelected }: TreeNodeProps) => {
	const dragOverProps = useDragOver(node.id, isOpen, onToggle);

	return (
		<Box
			component={'span'}
			onClick={() => onClickHandler(node.id.toString())}
			sx={{
				p: '0.25rem 0.75rem 0 0',
				maxHeight: '1.5rem',
				display: 'flex',
				backgroundColor: isSelected ? '#DDDDDD' : 'transparent',
				pl: 4 * depth,
				'&:hover ': {
					'& p ': {
						fontWeight: 'bold'
					},
					backgroundColor: 'rgba(0, 0, 0, 0.06)',
					'& div#option-menu': {
						display: 'flex'
					}
				}
			}}
			{...dragOverProps}>
			<EditNode treeData={treeData} setTreeData={setTreeData} node={node} onToggle={onToggle} isOpen={isOpen} />
			<Box id={'option-menu'} sx={{ display: 'flex', maxHeight: '100%', alignItems: 'center', flex: 1 }}>
				{node.droppable && <AddNewFile setTreeData={setTreeData} nodeId={node.id.toString()} treeData={treeData} />}
				{node.data && <VerticalMenu nodeId={node.id.toString()} text={node.text} treeData={treeData} setTreeData={setTreeData} link={node.data.link} />}
			</Box>
		</Box>
	);
};

export default TreeNode;
