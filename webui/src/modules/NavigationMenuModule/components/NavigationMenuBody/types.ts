import { type TreeDataProps } from '../../types';

export type NavigationMenuBodyProps = TreeDataProps & {
	refreshTreeData: () => void;
};
