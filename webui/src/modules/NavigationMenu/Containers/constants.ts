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
			link: '/project-description/1'
		}
	},
	{
		id: 2,
		parent: 1,
		text: 'Project Management',
		droppable: true,
		data: { iconName: 'folder_open', link: '/project-description/1/project-management' }
	},
	{
		id: 22,
		parent: 2,
		text: 'Tasks',
		data: { iconName: 'text_snippet_outlined', link: '/project-description/1/tasks' }
	},
	{
		id: 222,
		parent: 2,
		text: 'Projects',
		data: { iconName: 'folder_open', link: '/project-description/1/projects' },
		droppable: true
	},
	{
		id: 3333,
		parent: 222,
		text: 'Eshop',
		data: {
			iconName: 'text_snippet_outlined',
			link: '/project-description/1/e-shop'
		}
	},
	{
		id: 3,
		parent: 1,
		text: 'Development',
		data: {
			iconName: 'text_snippet_outlined',
			link: '/project-description/1/development'
		}
	},
	{
		id: 4,
		parent: 1,
		text: 'QA',
		data: {
			link: '/project-description/1/qa',
			iconName: 'text_snippet_outlined'
		}
	},
	{
		id: 5,
		parent: 1,
		text: 'Design',
		data: {
			link: '/project-description/1/design',
			iconName: 'text_snippet_outlined'
		}
	},
	{
		id: 6,
		parent: 1,
		text: 'Templates',
		data: {
			link: '/project-description/1/templates',
			iconName: 'text_snippet_outlined'
		}
	}
];

export { initialTreeData };
