import * as React from 'react'
import {useState} from 'react'
import {
  Tree,
  getBackendOptions,
  MultiBackend,
} from '@minoru/react-dnd-treeview'
import {DndProvider} from 'react-dnd'
import {Box, Divider, ListItem, ListItemIcon, Typography} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'

const initialDta = [
  {
    'id': 1,
    'parent': 0,
    'droppable': true,
    'text': 'AI Story Builder'
  },
  {
    'id': 2,
    'parent': 1,
    'text': 'Project Management',
    'droppable': true,
    //    'data': {
    //      'fileType': 'csv',
    //      'fileSize': '0.5MB'
    //    }
  },
  {
    'id': 22,
    'parent': 2,
    'text': 'Tasks',
    'data': {
      'fileType': 'csv',
      'fileSize': '0.5MB'
    }
  },
  {
    'id': 222,
    'parent': 2,
    'text': 'Projects',
    'data': {
      'fileType': 'csv',
      'fileSize': '0.5MB'
    }
  },
  {
    'id': 3,
    'parent': 1,
    'text': 'Development',
    'data': {
      'fileType': 'pdf',
      'fileSize': '4.8MB'
    }
  },
  {
    'id': 4,
    'parent': 1,
    'text': 'QA',
    'data': {
      'fileType': 'pdf',
      'fileSize': '4.8MB'
    }
  },
  {
    'id': 5,
    'parent': 1,
    'text': 'Design',
    'data': {
      'fileType': 'pdf',
      'fileSize': '4.8MB'
    }
  },
  {
    'id': 6,
    'parent': 1,
    'text': 'Templates',
    'data': {
      'fileType': 'pdf',
      'fileSize': '4.8MB'
    }
  }
]
const NavigationMenuBody = () => {
  const [treeData, setTreeData] = useState(initialDta)
  const handleDrop = (newTreeData) => setTreeData(newTreeData)
  return (
    <Box sx={{
      '& .Root': {ml: 0, pl: '1rem',mt: '0.75rem',mb:'1rem'},
      '& .Root .Container': {ml: '1rem', pl: '1rem'},
      '& ul': {ml: '1rem'},
      '& li': {listStyleType: 'none'}
    }}
    >
      <Divider/>
      <ListItem><ListItemIcon><FolderOpenIcon/></ListItemIcon><Typography>Shared</Typography></ListItem>
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          tree={treeData}
          dragPreviewRender={(monitorProps) => {
            const item = monitorProps.item
            return (
              <Typography sx={{fontSize: '0.75rem', pl: '1rem', color: 'blue'}}>{item.text}</Typography>
            )
          }}
          rootId={0}
          classes={{
            'root': 'Root',
            'listItem': 'ListItem',
            'container': 'Container',
          }}
          id={'tree-view-id'}
          onDrop={handleDrop}
          canDrop={(tree, {dragSource, dropTargetId}) => {
            if (dragSource?.parent === dropTargetId) return true
          }}
          sort={false}
          insertDroppableFirst={false}
          render={(node, {depth, isOpen, onToggle}) => (
            <>
              <Typography sx={{ml: depth * 0.1, p: 0,pt:'0.75rem', display: 'flex'}}>
                {node.droppable && (
                  <ListItemIcon sx={{minWidth: '0.5rem'}} onClick={onToggle}>{isOpen ? <ExpandMoreIcon/> : <ChevronRightIcon/>}</ListItemIcon>
                )}
                <Box component={'span'} sx={{display: 'flex', alignItems: 'center'}}>{node.text}</Box>
              </Typography>
            </>
          )}
        />
      </DndProvider>
    </Box>
  )
}
export default NavigationMenuBody