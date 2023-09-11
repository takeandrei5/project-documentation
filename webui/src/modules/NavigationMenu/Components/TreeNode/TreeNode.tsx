import { useDragOver } from '@minoru/react-dnd-treeview';
import { Box, type Theme } from '@mui/material';
import { AddNewFile } from '../AddNewFile';
import EditNode from '../EditNode/EditNode';
import { VerticalMenu } from '../VerticalMenu';
import type { TreeNodeProps } from './types';
import hexToRgba from 'hex-to-rgba';

const TreeNode: React.FC<TreeNodeProps> = ({ node, treeData, setTreeData, onClickHandler, onToggle, depth, isOpen, isSelected }: TreeNodeProps) => {
	const dragOverProps = useDragOver(node.id, isOpen, onToggle);

	return (
		<Box
			onClick={() => onClickHandler(node.id.toString())}
			sx={(theme: Theme) => ({
				backgroundColor: isSelected ? `${hexToRgba(theme.palette.cyan[10], 0.5)} !important` : 'transparent',
				borderRadius: '0.5rem',
				cursor: 'pointer',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				paddingTop: '0.5rem',
				paddingBottom: '0.5rem',
				paddingRight: '0.5rem',
				paddingLeft: !depth ? '0.5rem' : 2 * depth,
				'svg.MuiSvgIcon-root path': {
					fill: isSelected ? theme.palette.purple[100] : theme.palette.cyan[40]
				},
				'span.material-icons': {
					color: isSelected ? theme.palette.purple[100] : theme.palette.cyan[40]
				},
				'span.MuiTypography-root': {
					color: isSelected ? theme.palette.purple[100] : theme.palette.textColor[60],
					fontWeight: isSelected ? 700 : 500
				},
				'&:active': {
					backgroundColor: theme.palette.cyan[20],
					color: theme.palette.purple[100],
					'& span.material-icons': {
						color: theme.palette.purple[100]
					}
				},
				'&:hover ': {
					backgroundColor: theme.palette.cyan[10],
          // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
					'& p ': {
						fontWeight: 700
					},
					'& span.material-icons': {
						color: theme.palette.purple[100]
					},
					'svg.MuiSvgIcon-root path': {
						fill: theme.palette.purple[100]
					},
					'& div#option-menu': {
						display: 'flex'
					},
					'span.MuiTypography-root': {
						color: theme.palette.purple[100],
						fontWeight: 700
					}
				}
			})}
			{...dragOverProps}>
			<EditNode treeData={treeData} setTreeData={setTreeData} node={node} onToggle={onToggle} isOpen={isOpen} />
			<Box id='option-menu' sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem', maxHeight: '1.25rem' }}>
				{node.droppable && <AddNewFile setTreeData={setTreeData} nodeId={node.id.toString()} treeData={treeData} />}
				{node.data && <VerticalMenu nodeId={node.id.toString()} text={node.text} treeData={treeData} setTreeData={setTreeData} link={node.data.link} />}
			</Box>
		</Box>
	);
};

export default TreeNode;
