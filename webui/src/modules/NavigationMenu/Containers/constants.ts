import type { NodeModel } from '@minoru/react-dnd-treeview';
import type { TreeDataValues } from '../types';

const initialTreeData: NodeModel<TreeDataValues>[] = [
	{
		id: 1,
		parent: 0,
		droppable: true,
		text: 'AI Story Builder',
		data: {
			iconName: 'folder_open',
			link: '/project-description/1',
			isDeleted: false
		}
	},
	{
		id: 2,
		parent: 1,
		text: 'Project Management',
		droppable: true,
		data: { iconName: 'folder_open', link: '/project-description/1/project-management', isDeleted: false }
	},
	{
		id: 22,
		parent: 2,
		text: 'Tasks',
		data: { iconName: 'text_snippet_outlined', link: '/project-description/1/tasks', isDeleted: false }
	},
	{
		id: 222,
		parent: 2,
		text: 'Projects',
		data: { iconName: 'folder_open', link: '/project-description/1/projects', isDeleted: false },
		droppable: true
	},
	{
		id: 3333,
		parent: 222,
		text: 'Eshop',
		data: {
			iconName: 'text_snippet_outlined',
			link: '/project-description/1/e-shop',
			isDeleted: false
		}
	},
	{
		id: 3,
		parent: 1,
		text: 'Development',
		data: {
			iconName: 'text_snippet_outlined',
			link: '/project-description/1/development',
			isDeleted: false
		}
	},
	{
		id: 4,
		parent: 1,
		text: 'QA',
		data: {
			link: '/project-description/1/qa',
			iconName: 'text_snippet_outlined',
			isDeleted: false
		}
	},
	{
		id: 5,
		parent: 1,
		text: 'Design',
		data: {
			link: '/project-description/1/design',
			iconName: 'text_snippet_outlined',
			isDeleted: false
		}
	},
	{
		id: 6,
		parent: 1,
		text: 'Templates',
		data: {
			link: '/project-description/1/templates',
			iconName: 'text_snippet_outlined',
			isDeleted: false
		}
	}
];

export { initialTreeData };
