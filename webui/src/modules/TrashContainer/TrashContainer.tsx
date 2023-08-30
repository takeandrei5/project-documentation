import { Box, Icon, ListItemIcon, Typography } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';
import { TreeDataValues } from '../NavigationMenu/types';
import { MultiBackend, Tree, getBackendOptions, type DragLayerMonitorProps, type NodeModel } from '@minoru/react-dnd-treeview';
import { DndProvider } from 'react-dnd';
import { useEffect, useState } from 'react';

const TrashContainer:React.FC = () => {
	const trashData:NodeModel<TreeDataValues>[] = useAppSelector((state) => state.trash);
	console.log('trashData', trashData);
	return (
		<Box sx={{ height: '100%', width: '100%', bgcolor: '#FFFFFF' }}>
			<TreeView initialData={trashData} />

		</Box>
	);
};

export default TrashContainer;

const TreeNode = ({ node }) => {
	const { id, text, data, droppable } = node;

	return (
		<div>
			<div>
				<span>{text}</span>
			</div>
			{droppable && (
				<div style={{ marginLeft: '20px' }}>
					{node.children && node.children.map(child => (
						<TreeNode key={child.id} node={child} />
					))}
				</div>
			)}
		</div>
	);
};

const TreeView = ({ initialData: data }) => {
	// Create a mapping of parent IDs to their respective children
	const parentToChildrenMap = {};
	data.forEach(node => {
		if (!parentToChildrenMap[node.parent]) {
			parentToChildrenMap[node.parent] = [];
		}
		parentToChildrenMap[node.parent].push(node);
	});

	// Create a function to recursively build the tree
	const buildTree = parentId => {
		const children = parentToChildrenMap[parentId] || [];
		return children.map(child => ({
			...child,
			children: buildTree(child.id)
		}));
	};

	// Build the root nodes of the tree (nodes with parent 1)
//	const rootNodes = buildTree(1);
	const rootNodes = buildTree(0).concat(buildTree(1));


	return (
		<div>
			{rootNodes.map(node => (
				<TreeNode key={node.id} node={node} />
			))}
		</div>
	);
};


