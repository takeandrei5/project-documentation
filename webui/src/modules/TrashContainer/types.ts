import type { NodeModel } from '@minoru/react-dnd-treeview';
import type { TreeDataValues } from '../NavigationMenu/types';

export type TrashTreeDataValues = NodeModel<TreeDataValues> & {
  children: TrashTreeDataValues[];
}