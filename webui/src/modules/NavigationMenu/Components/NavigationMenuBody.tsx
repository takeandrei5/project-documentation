import {MultiBackend, Tree, getBackendOptions} from '@minoru/react-dnd-treeview'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import {Box, Divider, Icon, ListItem, ListItemIcon, Typography} from '@mui/material'
import {useState} from 'react'
import {DndProvider} from 'react-dnd'
import VerticalMenu from './VerticalMenu'

export type TreeDataProps = {
  id:number
  parent:number
  droppable?:boolean
  text:string
  iconName?:string
  link:string
  data?:{
    fileType?:string
    fileSize?:string
  }
}
const initialDta:TreeDataProps[] = [
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
const NavigationMenuBody:React.FC = () => {
  const [treeData, setTreeData] = useState<TreeDataProps[]>(initialDta)
  const handleDrop = (newTreeData) => setTreeData(newTreeData)
  return (
    <Box
      sx={{
        '& .Root': {ml: 0, pl: '1rem', mt: '0.75rem', mb: '1rem'},
        '& .Root .Container': {ml: '1rem', pl: '1rem'},
        '& ul': {ml: '1rem'},
        '& li': {listStyleType: 'none'}
      }}
    >
      <Divider/>
      <ListItem>
        <ListItemIcon>
          <FolderOpenIcon/>
        </ListItemIcon>
        <Typography>Shared</Typography>
      </ListItem>
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          tree={treeData}
          dragPreviewRender={(monitorProps) => {
            const item = monitorProps.item
            return <Typography sx={{fontSize: '0.75rem', fontWeight: 'bold', pl: '1rem', color: 'black', opacity: 0.7}}>{item.text}</Typography>
          }}
          rootId={0}
          classes={{
            root: 'Root',
            listItem: 'ListItem',
            container: 'Container'
          }}
          id={'tree-view-id'}
          onDrop={handleDrop}
          canDrop={(_, {dragSource, dropTargetId}) => {
            if (dragSource?.parent === dropTargetId) return true
          }}
          sort={false}
          insertDroppableFirst={false}
          render={(node, {depth, isOpen, onToggle}) => (
            <>
              <Box component={'span'} sx={{ml: depth * 0.1, p: '0.25rem 0.75rem 0 0', display: 'flex'}}>
                <Box onClick={onToggle} sx={{
                  display: 'flex', alignItems: 'center', width: '100%', cursor: 'pointer', '&:hover p': {
                    fontWeight: 'bold'
                  }
                }}
                >
                  {node.droppable && (
                    <ListItemIcon sx={{minWidth: '0.5rem', cursor: 'pointer'}}>
                      {isOpen ? <Icon>expand_more</Icon> : <Icon>chevron_right</Icon>}
                    </ListItemIcon>
                  )}
                  <ListItemIcon sx={{minWidth: 0, mr: '0.25rem'}}><Icon>{node.iconName}</Icon></ListItemIcon>
                  <Typography sx={{display: 'flex', alignItems: 'center'}}>
                    {node.text}
                  </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', flex: 1}}><VerticalMenu link={node.link}
                                                                                         nodeId={node.id}
                                                                                         text={node.text}
                                                                                         treeData={treeData}
                                                                                         setTreeData={setTreeData}
                /></Box>

              </Box>
            </>
          )}
        />
      </DndProvider>
    </Box>
  )
}
export default NavigationMenuBody
