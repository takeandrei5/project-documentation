import {Box, Divider} from '@mui/material'
import {NavigationMenuHeader, NavigationMenuBody, NavigationMenuFooter} from '../components'
import {FC, useEffect, useState} from 'react'
import {TreeDataValues} from '../types'

export const initialTreeData:TreeDataValues[] = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'AI Story Builder',
    iconName: 'folder_open',
    link: '/project-description/1'
  },
  {
    id: 2,
    parent: 1,
    text: 'Project Management',
    droppable: true,
    iconName: 'folder_open',
    link: '/project-description/1/project-management'


    //    'data': {
    //      'fileType': 'csv',
    //      'fileSize': '0.5MB'
    //    }
  },
  {
    id: 22,
    parent: 2,
    text: 'Tasks',
    iconName: 'text_snippet_outlined',
    link: '/project-description/1/tasks',
    data: {
      fileType: 'csv',
      fileSize: '0.5MB'
    }
  },
  {
    id: 222,
    parent: 2,
    text: 'Projects',
    iconName: 'folder_open',
    link: '/project-description/1/projects',
    droppable: true,
  },
  {
    id: 3333,
    parent: 222,
    text: 'Eshop',
    iconName: 'text_snippet_outlined',
    link: '/project-description/1/e-shop',
    data: {
      fileType: 'csv',
      fileSize: '0.5MB'
    }
  },
  {
    id: 3,
    parent: 1,
    text: 'Development',
    iconName: 'text_snippet_outlined',
    link: '/project-description/1/development',
    data: {
      fileType: 'pdf',
      fileSize: '4.8MB'
    }
  },
  {
    id: 4,
    parent: 1,
    text: 'QA',
    iconName: 'text_snippet_outlined',
    link: '/project-description/1/qa',
    data: {
      fileType: 'pdf',
      fileSize: '4.8MB'
    }
  },
  {
    id: 5,
    parent: 1,
    text: 'Design',
    iconName: 'text_snippet_outlined',
    link: '/project-description/1/design',
    data: {
      fileType: 'pdf',
      fileSize: '4.8MB'
    }
  },
  {
    id: 6,
    parent: 1,
    text: 'Templates',
    iconName: 'text_snippet_outlined',
    link: '/project-description/1/templates',
    data: {
      fileType: 'pdf',
      fileSize: '4.8MB'
    }
  }
]
const NavMenu:FC = () => {
  const [treeData, setTreeData] = useState<TreeDataValues[]>(initialTreeData)
  return (
    <Box>
      <NavigationMenuHeader treeData={treeData} setTreeData={setTreeData}/>
      <NavigationMenuBody treeData={treeData} setTreeData={setTreeData}/>
      <Divider/>
      <NavigationMenuFooter/>
    </Box>
  )
}

export default NavMenu
