import { MultiBackend, Tree, getBackendOptions, type DragLayerMonitorProps, type NodeModel, type RenderParams } from '@minoru/react-dnd-treeview';
import { Box, type Theme } from '@mui/material';
import { DndProvider } from 'react-dnd';
import type { TreeDataProps, TreeDataValues } from '../../types';
import { TreeNode } from '../TreeNode';
import { useNavigationMenuBody } from './hooks';

const NavigationMenuBody: React.FC<TreeDataProps> = ({ treeData, setTreeData }) => {
	const { onClickHandler, onDropHandler, selectedTreeNode } = useNavigationMenuBody(setTreeData);

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
										onClickHandler={onClickHandler}
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
									onClickHandler={onClickHandler}
									onToggle={onToggle}
									depth={depth}
									isOpen={isOpen}
									isSelected={selectedTreeNode === node.id}
								/>
							);
						}}
					/>
				</DndProvider>
				<Box
					sx={(theme: Theme) => ({
						// backgroundColor: isSelected ? `${hexToRgba(theme.palette.cyan[10], 0.5)} !important` : 'transparent',
						borderRadius: '0.5rem',
						cursor: 'pointer',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						paddingTop: '0.5rem',
						paddingBottom: '0.5rem',
						paddingRight: '0.5rem',
						// 'svg.MuiSvgIcon-root path': {
						// 	fill: true === false ? theme.palette.purple[100] : theme.palette.cyan[40]
						// },
						// 'span.material-icons': {
						// 	color: 2 === 1 ? theme.palette.purple[100] : theme.palette.cyan[40]
						// },
						// 'span.MuiTypography-root': {
						// 	color: !1 ? theme.palette.purple[100] : theme.palette.textColor[60],
						// 	fontWeight: 700
						// },
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
					})}>
					hello
				</Box>
			</Box>
		</Box>
	);
};
export default NavigationMenuBody;
