import { MultiBackend, Tree, getBackendOptions, type DragLayerMonitorProps, type NodeModel, type RenderParams } from '@minoru/react-dnd-treeview';
import { Box, Divider, Skeleton, type Theme } from '@mui/material';
import { DndProvider } from 'react-dnd';
import type { TreeDataValues } from '../../types';
import { NavigationMenuItem } from '../../views/NavigationMenuItem';
import { TreeNode } from '../TreeNode';
import { useNavigationMenuBody } from './hooks';
import type { NavigationMenuBodyProps } from './types';

const NavigationMenuBody: React.FC<NavigationMenuBodyProps> = ({ isLoading, pages, refreshTreeData }) => {
	const { onAddNewPageHandler, onPageClickedHandler, onUpdateTreeHandler, selectedTreeNode, setTreeData, treeData } = useNavigationMenuBody(pages, refreshTreeData);

	return (
		<>
			{!isLoading ? (
				<Box
					sx={{
            overflow: 'scroll',
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
								onDrop={onUpdateTreeHandler}
								canDrop={(_, { dragSource, dropTargetId }) => {
									if (dragSource && dragSource.parent === dropTargetId) {
										return true;
									}
								}}
								dragPreviewRender={({ item }: DragLayerMonitorProps<TreeDataValues>) => {
									return (
										<Box
											sx={{
												width: '100%',
												'& div#option-menu': {
													display: 'none'
												}
											}}>
											<TreeNode
												node={item}
												treeData={treeData}
												setTreeData={onUpdateTreeHandler}
												onClickHandler={onPageClickedHandler}
												onToggle={() => {
													return;
												}}
												onAddNewPageHandler={() => {
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
											setTreeData={onUpdateTreeHandler}
											onClickHandler={onPageClickedHandler}
											onAddNewPageHandler={(parentId: string) => {
												if (!isOpen) {
													onToggle();
												}
												onAddNewPageHandler(parentId);
											}}
											onToggle={onToggle}
											depth={depth}
											isOpen={isOpen}
											isSelected={selectedTreeNode === node.id}
											isCreating={node.data!.isCreating}
										/>
									);
								}}
							/>
						</DndProvider>
						<NavigationMenuItem isLoading={false} icon='add' onClick={() => onAddNewPageHandler()} text='Add new page' />
					</Box>
				</Box>
			) : (
				<>
					<Skeleton animation='wave' variant='rounded' width='100%' height='20rem' />
				</>
			)}
			<Divider sx={{ marginY: '0.5rem' }} />
		</>
	);
};
export default NavigationMenuBody;
