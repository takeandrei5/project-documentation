import { type TreeDataProps } from '../../types';

export type NavigationMenuBodyProps = TreeDataProps & {
  isLoading: boolean;
	refreshTreeData: () => void;
};
