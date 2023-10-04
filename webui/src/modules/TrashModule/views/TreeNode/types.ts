import type { TrashTreeDataValues } from '../../container/types';

export type TreeNodeProps = {
  level: number;
  node: TrashTreeDataValues;
  onRecoverFileClickedHandler: (node: TrashTreeDataValues) => void;
  onPermanentDeleteClickedHandler: (node: TrashTreeDataValues) => void;
}