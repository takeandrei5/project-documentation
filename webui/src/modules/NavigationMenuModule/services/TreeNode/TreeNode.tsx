import { useDragOver } from '@minoru/react-dnd-treeview';
import * as MUIIcons from '@mui/icons-material';
import { ChevronRight, ExpandMore } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, Tooltip, Typography, type Theme, Divider, useTheme, Icon } from '@mui/material';
import hexToRgba from 'hex-to-rgba';
import { useRef } from 'react';
import { TextFieldPopupC } from '../../../../components/TextFieldPopupC';
import type { MUIIconKeys } from '../../../../utils/types';
import { AddNewPage } from '../../views/AddNewPage';
import { VerticalMenu } from '../VerticalMenu';
import type { TreeNodeProps } from './types';
import { VerticalMenuItem } from '../../views';
import { useTreeNodeEdit, useVerticalMenuControl } from './hooks';

const TreeNode: React.FC<TreeNodeProps> = ({
	node,
	treeData,
	setTreeData,
	onClickHandler,
	onToggle,
	depth,
	isOpen,
	isSelected,
	isCreating,
	onAddNewPageHandler
}: TreeNodeProps) => {
	const dragOverProps = useDragOver(node.id, isOpen, onToggle);
	const editTreeNodeRef = useRef<HTMLElement | null>(null);
	const theme = useTheme();

	const { anchorEl, onDoubleClickHandler, onCloseHandler, onSaveNewValuesHandler, popupOpen } = useTreeNodeEdit(treeData, setTreeData, node);
	const { onCopyItemClickedHandler, onDuplicateItemHandler, onSoftDeleteItemHandler } = useVerticalMenuControl(treeData, setTreeData, node);

	if (!node.data) {
		return null;
	}

	const TreeNodeIcon = MUIIcons[node.data.iconName as MUIIconKeys] || Icon;

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
				pointerEvents: isCreating ? 'none' : 'auto',
				opacity: isCreating ? 0.5 : 1,
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
			<Box
				ref={editTreeNodeRef}
				tabIndex={0}
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: 'calc(100% - 3rem)',
					gap: '0.25rem',
					'&:focus': {
						outline: 'none'
					}
				}}>
				{node.droppable && (
					<IconButton onClick={onToggle} size='small' sx={{ height: '1.25rem', width: '1.25rem' }}>
						{isOpen ? (
							<ExpandMore sx={(theme: Theme) => ({ fill: theme.palette.purple[100], fontSize: '1.25rem' })} />
						) : (
							<ChevronRight
								sx={(theme: Theme) => ({
									fill: theme.palette.cyan[40],
									fontSize: '1.25rem',
									'&:hover': {
										fill: theme.palette.purple[100]
									}
								})}
							/>
						)}
					</IconButton>
				)}
				{/*<TreeNodeIcon sx={{ fontSize: '1.25rem' }} />*/}
				{popupOpen && anchorEl && node.data && (
					<TextFieldPopupC
						anchorEl={anchorEl}
						initialTextFieldValue={node.text}
						initialIconValue={node.data.iconName as MUIIconKeys}
						onClosePopupCallback={onSaveNewValuesHandler}
					/>
				)}
				<Tooltip enterDelay={1200} enterNextDelay={1200} enterTouchDelay={1200} placement='top' title={node.text} onDoubleClick={onDoubleClickHandler}>
					<Typography
						noWrap
						variant='smallMedium'
						sx={(theme: Theme) => ({ color: theme.palette.textColor[60], overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 'calc(100% - 1.5rem)' })}>
						{node.text}
					</Typography>
				</Tooltip>
			</Box>
			<Box
				id='option-menu'
				onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
				sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem', maxHeight: '1.25rem' }}>
				{node.data.isCreating ? (
					<CircularProgress color='inherit' size='1rem' />
				) : (
					<>
						<AddNewPage onAddNewPageHandler={() => onAddNewPageHandler(node.id as string)} />
						<VerticalMenu nodeId={node.id as string}>
							<VerticalMenuItem icon={MUIIcons.ContentCopy} onClickHandler={onCopyItemClickedHandler} text='Copy url' />
							{/* <VerticalMenuItem icon={MUIIcons.ContentPaste} onClickHandler={console.log} text='Paste' /> */}
							{/* <VerticalMenuItem icon={MUIIcons.DynamicFeed} onClickHandler={onDuplicateItemHandler} text='Duplicate' /> */}
							<Divider sx={{ my: '0.25rem !important', pointerEvents: 'none' }} />
							<VerticalMenuItem color={theme.palette.red[100]} icon={MUIIcons.DeleteOutline} onClickHandler={onSoftDeleteItemHandler} text='Delete' />
						</VerticalMenu>
					</>
				)}
			</Box>
		</Box>
	);
};

export default TreeNode;
