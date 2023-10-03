import { MultiBackend, Tree, type DragLayerMonitorProps, type NodeModel, type RenderParams, getBackendOptions } from '@minoru/react-dnd-treeview';
import { Box, type Theme } from '@mui/material';
import { DndProvider } from 'react-dnd';
import type { TreeDataValues } from '../../types';
import { NavigationMenuItem } from '../NavigationMenuItem';
import { TreeNode } from '../TreeNode';
import { useNavigationMenuBody } from './hooks';
import type { NavigationMenuBodyProps } from './types';

const NavigationMenuBody: React.FC<NavigationMenuBodyProps> = ({ treeData, setTreeData, refreshTreeData }) => {
	const { onNewPageClickedHandler, onPageClickedHandler, onDropHandler, selectedTreeNode } = useNavigationMenuBody(setTreeData, refreshTreeData);

	return (
		<Box
			sx={{
				'& .Placeholder': {
					position: 'relative'
				},
				'& .DraggingSource': {
					opacity: 0.3
				},
				'& .Container': {
					display: 'flex',
					flexDirection: 'column',
					gap: '0.1rem',
					margin: 0,
					paddingLeft: 0,
					'& ul': {
						marginTop: '0.1rem'
					}
				},
				'& .Container > .ListItem': {
					marginBottom: '0.25rem'
				},
				'& li': { listStyleType: 'none' }
			}}>
			<Box sx={{ position: 'relative' }}>
				<DndProvider backend={MultiBackend} options={getBackendOptions()}>
					<Tree<TreeDataValues>
						rootId={'0'}
						enableAnimateExpand
						insertDroppableFirst={false}
						sort={false}
						dropTargetOffset={5}
						tree={treeData.filter((node: NodeModel<TreeDataValues>) => !node.data || !node.data.isDeleted)}
						classes={{
							root: 'Root',
							draggingSource: 'DraggingSource',
							listItem: 'ListItem',
							container: 'Container',
							placeholder: 'Placeholder'
						}}
						onDrop={onDropHandler}
						canDrop={(_, { dragSource, dropTargetId }) => {
							if (dragSource && dragSource.parent === dropTargetId) {
								return true;
							}
						}}
						dragPreviewRender={(monitorProps: DragLayerMonitorProps<TreeDataValues>) => {
							return (
								<Box
									sx={{
										width: '16.875rem',
										'& div#option-menu': {
											display: 'none'
										}
									}}>
									<TreeNode
										node={monitorProps.item}
										treeData={treeData}
										setTreeData={setTreeData}
										onClickHandler={onPageClickedHandler}
										onToggle={() => {
											return;
										}}
										depth={0}
										isSelected
										isOpen={false}
									/>
								</Box>
							);
						}}
						placeholderRender={(_, { depth }) => {
							const left = depth * 2;

							return (
								<Box
									sx={(theme: Theme) => ({
										backgroundColor: theme.palette.purple[100],
										height: '0.125rem',
										position: 'absolute',
										right: 0,
										top: 0,
										left,
										transform: 'translateY(-50%)'
									})}
								/>
							);
						}}
						render={(node: NodeModel<TreeDataValues>, { depth, isOpen, onToggle }: RenderParams) => {
							return (
								<TreeNode
									node={node}
									treeData={treeData}
									setTreeData={setTreeData}
									onClickHandler={onPageClickedHandler}
									onToggle={onToggle}
									depth={depth}
									isOpen={isOpen}
									isSelected={selectedTreeNode === node.id}
								/>
							);
						}}
					/>
				</DndProvider>
				<NavigationMenuItem icon='add' onClick={() => onNewPageClickedHandler({
          name: 'untitled',
          iconName: 'add'
        })} text='Add new page' />
			</Box>
		</Box>
	);
};
export default NavigationMenuBody;
