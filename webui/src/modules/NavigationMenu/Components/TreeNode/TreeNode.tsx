import { Box, Icon, ListItemIcon } from '@mui/material';
import { AddNewFile } from '../AddNewFile';
import EditNode from '../EditNode/EditNode';
import { VerticalMenu } from '../VerticalMenu';
import type { TreeNodeProps } from './types';
import { useDragOver } from '@minoru/react-dnd-treeview';

const TreeNode: React.FC<TreeNodeProps> = ({ node, treeData, setTreeData, onClickHandler, onToggle, depth, isOpen, isSelected }: TreeNodeProps) => {
	const dragOverProps = useDragOver(node.id, isOpen, onToggle);

	return (
		<Box
			component={'span'}
			onClick={() => onClickHandler(+node.id)}
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
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: '100%',
					cursor: 'pointer'
				}}>
				{node.droppable && (
					<ListItemIcon onClick={onToggle} sx={{ minWidth: '0.5rem', cursor: 'pointer' }}>
						{isOpen ? <Icon>expand_more</Icon> : <Icon>chevron_right</Icon>}
					</ListItemIcon>
				)}
				{node.data?.iconName && (
					<ListItemIcon sx={{ minWidth: 0, cursor: 'default', mr: '0.25rem' }}>
						<Icon>{node.data.iconName}</Icon>
					</ListItemIcon>
				)}
				<EditNode treeData={treeData} setTreeData={setTreeData} node={node} onToggle={onToggle} isOpen={isOpen} />
			</Box>
			<Box id={'option-menu'} sx={{ display: 'none', maxHeight: '100%', alignItems: 'center', flex: 1 }}>
				{node.droppable && <AddNewFile setTreeData={setTreeData} nodeId={node.id as number} treeData={treeData} />}
				<VerticalMenu nodeId={node.id as number} text={node.text} treeData={treeData} setTreeData={setTreeData} link={node.data!.link} />
			</Box>
		</Box>
	);
};

export default TreeNode;
