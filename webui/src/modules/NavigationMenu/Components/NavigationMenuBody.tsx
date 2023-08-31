import { MultiBackend, Tree, getBackendOptions, type DragLayerMonitorProps, type NodeModel } from '@minoru/react-dnd-treeview';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Box, Divider, Icon, ListItem, ListItemIcon, Typography } from '@mui/material';
import { DndProvider } from 'react-dnd';
import type { TreeDataProps, TreeDataValues } from '../types';
import { AddNewFile } from './AddNewFile';
import EditNode from './EditNode/EditNode';
import { VerticalMenu } from './VerticalMenu';

const NavigationMenuBody: React.FC<TreeDataProps> = ({ treeData, setTreeData }) => {
	const handleDrop = (newTreeData: NodeModel<TreeDataValues>[]): void => {
		setTreeData(newTreeData);
	};

	return (
		<Box
			sx={{
				'& .Root': { mt: '0.75rem', mb: '1rem', pl: '1rem' },
				'& li': { listStyleType: 'none' },
				'&  ul.Root': { padding: 0 },
				'& .Root ul': { padding: 0 }
			}}>
			<Divider />
			<ListItem>
				<ListItemIcon>
					<FolderOpenIcon />
				</ListItemIcon>
				<Typography>Shared</Typography>
			</ListItem>
			<Box sx={{ position: 'relative' }}>
				<DndProvider backend={MultiBackend} options={getBackendOptions()}>
					<Tree<TreeDataValues>
						tree={treeData.filter((node: NodeModel<TreeDataValues>) => !node.data?.isDeleted)}
						dragPreviewRender={(monitorProps: DragLayerMonitorProps<TreeDataValues>) => {
							const item = monitorProps.item;
							return (
								<Box
									id={'list-id'}
									component={'div'}
									sx={{
										position: 'absolute',
										top: 0,
										p: '0.25rem 0.75rem 0 0',
										backgroundColor: 'rgba(0, 0, 0, 0.06)',
										width: '60%'
									}}>
									<Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', pl: '1rem', color: 'black', opacity: 0.7 }}>{item.text}</Typography>
								</Box>
							);
						}}
						rootId={0}
						classes={{
							root: 'Root',
							listItem: 'ListItem',
							container: 'Container'
						}}
						onDrop={handleDrop}
						canDrop={(_, { dragSource, dropTargetId }) => {
							if (dragSource?.parent === dropTargetId) return true;
						}}
						sort={false}
						insertDroppableFirst
						placeholderRender={(_, { depth }) => {
							const left = depth * 4;
							return (
								<Box
									sx={{
										backgroundColor: 'red',
										height: '2px',
										position: 'absolute',
										right: 0,
										top: 0,
										transform: 'translateY(-50%)'
									}}
									style={{ left }}></Box>
							);
						}}
						render={(node, { depth, isOpen, onToggle }) => {
							return (
								<>
									<Box
										id={'list-id'}
										component={'span'}
										sx={{
											p: '0.25rem 0.75rem 0 0',
											display: 'flex',
											pl: 4 * depth,
											'&:hover ': {
												'& p ': {
													fontWeight: 'bold'
												},
												backgroundColor: 'rgba(0, 0, 0, 0.06)'
												//												'& #option-menu': {
												//													visibility: 'visible'
												//												}
											}
										}}>
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
											<ListItemIcon sx={{ minWidth: 0, mr: '0.25rem' }}>
												<Icon>{node.data!.iconName}</Icon>
											</ListItemIcon>
											<EditNode treeData={treeData} setTreeData={setTreeData} node={node} />
										</Box>
										<Box id={'option-menu'} sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
											{node.droppable && <AddNewFile setTreeData={setTreeData} nodeId={node.id as number} treeData={treeData} />}
											<VerticalMenu
												nodeId={node.id as number}
												text={node.text}
												treeData={treeData}
												setTreeData={setTreeData}
											/>
										</Box>
									</Box>
								</>
							);
						}}
					/>
				</DndProvider>
			</Box>
		</Box>
	);
};
export default NavigationMenuBody;
