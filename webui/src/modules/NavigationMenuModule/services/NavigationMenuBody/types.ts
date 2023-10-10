import type { PageDto } from '../../../../api/webapi/pages/types';

export type NavigationMenuBodyProps = {
	pages: PageDto[];
	isLoading: boolean;
	refreshTreeData: () => void;
};
