import type { NodeModel } from '@minoru/react-dnd-treeview';
import type { TreeDataValues } from '../NavigationMenuModule/types';

export type TrashTreeDataValues = NodeModel<TreeDataValues> & {
  children: TrashTreeDataValues[];
}