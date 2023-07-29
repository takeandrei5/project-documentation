import { MultiBackend, Tree, getBackendOptions, type DragLayerMonitorProps, type NodeModel } from '@minoru/react-dnd-treeview';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Box, Divider, Icon, ListItem, ListItemIcon, Typography } from '@mui/material';
import { DndProvider } from 'react-dnd';
import type { TreeDataProps, TreeDataValues } from '../types';
import { AddNewFile } from './AddNewFile';
import { VerticalMenu } from './VerticalMenu';

const NavigationMenuBody: React.FC<TreeDataProps> = ({ treeData, setTreeData }) => {
	const handleDrop = (newTreeData: NodeModel<TreeDataValues>[]) => {
		setTreeData(newTreeData);
	};

	return (
		<Box
			sx={{
				'& .Root': { ml: 0, pl: '1rem', mt: '0.75rem', mb: '1rem' },
				'& .Root .Container': { ml: '1rem', pl: '1rem' },
				'& ul': { ml: '1rem' },
				'& li': { listStyleType: 'none' }
			}}>
			<Divider />
			<ListItem>
				<ListItemIcon>
					<FolderOpenIcon />
				</ListItemIcon>
				<Typography>Shared</Typography>
			</ListItem>
			<DndProvider backend={MultiBackend} options={getBackendOptions()}>
				<Tree<TreeDataValues>
					tree={treeData}
					dragPreviewRender={(monitorProps: DragLayerMonitorProps<TreeDataValues>) => {
						const item = monitorProps.item;
						return <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', pl: '1rem', color: 'black', opacity: 0.7 }}>{item.text}</Typography>;
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
					render={(node, { depth, isOpen, onToggle }) => {
						return (
							<>
								<Box component={'span'} sx={{ ml: depth * 0.1, p: '0.25rem 0.75rem 0 0', display: 'flex' }}>
									<Box
										onClick={onToggle}
										sx={{
											display: 'flex',
											alignItems: 'center',
											width: '100%',
											cursor: 'pointer',
											'&:hover p': {
												fontWeight: 'bold'
											}
										}}>
										{node.droppable && <ListItemIcon sx={{ minWidth: '0.5rem', cursor: 'pointer' }}>{isOpen ? <Icon>expand_more</Icon> : <Icon>chevron_right</Icon>}</ListItemIcon>}
										<ListItemIcon sx={{ minWidth: 0, mr: '0.25rem' }}>
											<Icon>{node.data!.iconName}</Icon>
										</ListItemIcon>
										<Typography sx={{ display: 'flex', alignItems: 'center' }}>{node.text}</Typography>
									</Box>
									<Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
										{node.droppable && <AddNewFile setTreeData={setTreeData} nodeId={node.id as number} treeData={treeData} />}
										<VerticalMenu nodeId={node.id as number} text={node.text} treeData={treeData} setTreeData={setTreeData} />
									</Box>
								</Box>
							</>
						);
					}}
				/>
			</DndProvider>
		</Box>
	);
};
export default NavigationMenuBody;
