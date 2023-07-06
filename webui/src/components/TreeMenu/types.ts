import {SvgIconProps} from '@mui/material'
import React from 'react'
import {
  MultiSelectTreeViewProps as MuiMultiSelectTreeViewProps,
  SingleSelectTreeViewProps as MuiSingleSelectTreeViewProps,
} from '@mui/lab'

export type DraggedTreeNode = {
  parentNode:TreeNode | null;
  node:TreeNode;
  depth:number;
}

export type TreeNode = {
  id:string;
  name:string;
  order?:number;
  data?:any;
  iconUrl?:string;
  icon?:React.ElementType<SvgIconProps>;
  children?:TreeNode[];
  isRoot?:boolean;
  disabled?:boolean;
}

export type TreeViewOrderResult = {
  draggedTreeNodeOrder:number;
  siblingsOfDraggedTreeNode:TreeNode[];
}
export interface MuiDraggableTreeViewBaseProps {
  enableDragAndDrop?: boolean;
  tree: TreeNode;
  collapseIcon?: React.ElementType<SvgIconProps>;
  expandIcon?: React.ElementType<SvgIconProps>;
  onNodeDragOver?: (sourceNode: TreeNode, destinationNode: TreeNode) => boolean;
  onNodeDrop?: (sourceNode: TreeNode, destinationNode: TreeNode) => void;
  onNodeReOrder?: (sourceNode: TreeNode, destinationNode: TreeNode) => void;
  onNodeReOrderOver?: (
    sourceNode: TreeNode,
    destinationNode: TreeNode,
    isBeforeDestinationNode: boolean
  ) => boolean;
  onNodeSelected?: (sourceNode: TreeNode) => void;
}

export interface SingleSelectTreeViewProps
  extends MuiSingleSelectTreeViewProps,
    MuiDraggableTreeViewBaseProps {}

export interface MultiSelectTreeViewProps
  extends MuiMultiSelectTreeViewProps,
    MuiDraggableTreeViewBaseProps {}