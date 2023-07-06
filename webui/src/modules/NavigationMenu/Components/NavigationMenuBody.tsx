import * as React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {useState} from 'react'
//import {TreeItem, TreeView} from '@mui/lab'
import {ListItem, ListItemIcon, Typography} from '@mui/material'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import TreeMenu from '../../../components/TreeMenu/TreeMenu'

const data = {
  id: 'root',
  name: 'AI Story Builder',
  children: [
    {
      id: 'project-1',
      name: 'Product Management',

    },
    {
      id: 'project-2',
      name: 'Development',
    },
    {
      id: 'project-3',
      name: 'Design',
      children: [
        {
          id: 'project-4',
          name: 'Design System',
        },
      ],
    },
    {
      id: 'project-5',
      name: 'Reusable Components',
      children: [
        {
          id: 'project-6',
          name: 'Google Sign In',
        },
        {
          id: 'project-7',
          name: 'Facebook Sign In',
        },
      ],
    },
  ],
}
const arr = [
  {id: 'item-1', name: 'Create a teamspace'},
  {id: 'item-2', name: 'Templates'},
  {id: 'item-3', name: 'Import'},
  {id: 'item-4', name: 'Trash'}
]

const NavigationMenuBody = () => {
  const [orderListMenu, setOrderListMenu] = useState<any[]>(arr)

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  )
  console.log({orderListMenu})

  function handleOnDragEnd(result) {
    const items = Array.from(orderListMenu)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setOrderListMenu(items)
  }
  return (
    <>

      <TreeMenu tree={data} enableDragAndDrop={true}/>
      {/*<TreeView*/}
      {/*  aria-label="file system navigator"*/}
      {/*  defaultCollapseIcon={<ExpandMoreIcon/>}*/}
      {/*  defaultExpandIcon={<ChevronRightIcon/>}*/}
      {/*  sx={{height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}*/}
      {/*>*/}
      {/*  {renderTree(data)}*/}
      {/*</TreeView>*/}
    </>

  )
}
export default NavigationMenuBody