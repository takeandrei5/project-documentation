import React, {useEffect, useState} from 'react'
import {DraggedTreeNode, MultiSelectTreeViewProps, SingleSelectTreeViewProps, TreeNode} from './types'
import {default as MuiTreeView} from '@mui/lab/TreeView'
import {useDraggableTreeMenu} from './hooks'
import {createStyles, styled} from '@mui/material'
import {AddBox, IndeterminateCheckBox} from '@mui/icons-material'
import {makeStyles} from'@mui/styles'
import StyledTreeItem from './StyledTreeItem'


const TreeMenu:React.FC<SingleSelectTreeViewProps | MultiSelectTreeViewProps> = (
  props:SingleSelectTreeViewProps | MultiSelectTreeViewProps
) => {
  const [tree, setTree] = useState<TreeNode>(props.tree)
  const [allParentIds, setAllParentIds] = useState<string[]>([])
  const [expanded, setExpanded] = useState<string[]>([props.tree.id])
  const classes = useStyles()
  let draggedTreeNode:DraggedTreeNode | null
  const {moveNode, deleteNode, reOrderNodes} = useDraggableTreeMenu()

  useEffect(() => {
    const ids:string[] = []
    populateAllParentNodeIds(ids, props.tree)
    setAllParentIds(ids)
    setTree(props.tree)
  }, [props.tree])

  const handleDragOver = (
    ev:React.DragEvent<HTMLLIElement>,
    destinationNode:TreeNode,
    depth:number
  ) => {
    ev.stopPropagation()

    let allowToDrag = true
    if (!draggedTreeNode) return

    if (
      draggedTreeNode.parentNode?.id === destinationNode.id ||
      draggedTreeNode.node.id === destinationNode.id ||
      (draggedTreeNode.node.children &&
        draggedTreeNode.node.children.length > 0 &&
        draggedTreeNode.depth < depth)
    )
      return

    if (props.onNodeDragOver) {
      allowToDrag = props.onNodeDragOver(draggedTreeNode.node, destinationNode)
    }

    if (allowToDrag) {
      ev.preventDefault()
      ev.currentTarget.classList.add(classes.dragOver)
    }
  }

  const handleDrop = (ev:React.DragEvent<HTMLLIElement>, destinationNode:TreeNode) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (!draggedTreeNode || !draggedTreeNode.parentNode) return

    const newTree = Immutable.fromJS(tree).toJS() as TreeNode

    moveNode(newTree, draggedTreeNode.node, destinationNode.id)
    deleteNode(newTree, draggedTreeNode.node.id, draggedTreeNode.parentNode.id)

    setTree(newTree)

    ev.currentTarget.classList.remove(classes.dragOver)

    if (props.onNodeDrop) props.onNodeDrop(draggedTreeNode.node, destinationNode)
  }

  const handleDragStart = (
    ev:React.DragEvent<HTMLLIElement>,
    parentNode:TreeNode | null,
    node:TreeNode,
    depth:number
  ) => {
    ev.stopPropagation()
    draggedTreeNode = {parentNode, node, depth} as DraggedTreeNode
  }

  const validateDragOver = (
    node:TreeNode,
    depth:number,
    isBeforeDestinationNode:boolean
  ):boolean => {
    if (!draggedTreeNode) return false

    if (
      draggedTreeNode.node.id.toString() === node.id ||
      (draggedTreeNode.parentNode && draggedTreeNode.parentNode.id.toString() === node.id) ||
      (draggedTreeNode.node.children &&
        draggedTreeNode.node.children.length > 0 &&
        draggedTreeNode.depth < depth)
    )
      return false

    if (
      props.onNodeReOrderOver &&
      !props.onNodeReOrderOver(draggedTreeNode.node, node, isBeforeDestinationNode)
    )
      return false

    return true
  }

  const handleDragLeave = (ev:React.DragEvent<HTMLLIElement>) => {
    ev.currentTarget.classList.remove(classes.dragOver)
  }

  const handleNodeReOrder = (
    ev:React.DragEvent<HTMLDivElement>,
    destinationNode:TreeNode,
    parentNodeIdOfDestinationNode:string,
    addBeforeDestinationNode:boolean
  ) => {
    ev.preventDefault()
    ev.stopPropagation()
    if (!draggedTreeNode) return

    const newTree = Immutable.fromJS(tree).toJS() as TreeNode
    const result = reOrderNodes(
      newTree,
      draggedTreeNode,
      destinationNode.id,
      parentNodeIdOfDestinationNode,
      addBeforeDestinationNode
    )

    if (!result) return

    draggedTreeNode.node.order = result.draggedTreeNodeOrder

    if (
      draggedTreeNode.parentNode &&
      draggedTreeNode.parentNode.id !== parentNodeIdOfDestinationNode
    ) {
      deleteNode(newTree, draggedTreeNode.node.id, draggedTreeNode.parentNode.id)
    }

    setTree(newTree)

    if (props.onNodeReOrder) props.onNodeReOrder(draggedTreeNode.node, destinationNode)
  }

  const populateAllParentNodeIds = (ids:string[], node:TreeNode) => {
    if (node.children) ids.push(node.id)

    node.children?.forEach((x) => {
      populateAllParentNodeIds(ids, x)
    })
  }

  const renderTree = (parentNode:TreeNode | null, node:TreeNode, depth:number) => {
    return (
      <StyledTreeItem
        key={node.id}
//        isExpanded={expanded.some((x) => x === node.id)}
        isExpanded={true}
        nodeId={node.id}
        labelIcon={node.icon}
        labelIconUrl={node.iconUrl}
        node={node}
        depth={depth}
        draggable={parentNode !== null && props.enableDragAndDrop}
        onNodeReOrder={(ev, isBeforeDestinationNode) =>
          parentNode && handleNodeReOrder(ev, node, parentNode.id, isBeforeDestinationNode)
        }
        validateDragOver={(isBeforeDestinationNode) =>
          validateDragOver(node, depth, isBeforeDestinationNode)
        }
        onDrop={(ev) => handleDrop(ev, node)}
        onDragLeave={handleDragLeave}
        onDragStart={(ev) => parentNode && handleDragStart(ev, parentNode, node, depth)}
        onDragOver={(ev:React.DragEvent<HTMLLIElement>) => handleDragOver(ev, node, depth)}
        onLabelClick={() => props.onNodeSelected?.(node)}
        labelText={node.name}
      >
        {node.children
          ? node.children
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((childNode) => renderTree(node, childNode, depth + 1))
          : null}
      </StyledTreeItem>
    )
  }

  const handleToggle = (_e:any, nodeIds:string[]) => {
    setExpanded(nodeIds)
  }

  return (
//    <div className={props.className}>
    <div>
      <div className={classes.expandCollapseButtonContainer}>
        <div className={classes.expandCollapseAllButton} onClick={() => setExpanded(allParentIds)}>
          {'ExpandAll'}
        </div>
        <div
          className={classes.expandCollapseAllButton}
          onClick={() => setExpanded([props.tree.id])}
        >
          {'CollapseAll'}
        </div>
      </div>
      <div>
        <MuiTreeView
          {...props}
          expanded={expanded}
//          className={props.classes?.root ?? classes.root}
          defaultCollapseIcon={<CollapseIcon/>}
          defaultExpandIcon={<ExpandIcon/>}
          onNodeToggle={handleToggle}
        >
          {/*{renderTree(null, tree, 0)}*/}
        </MuiTreeView>
      </div>
    </div>
  )
}

export default TreeMenu

const CollapseIcon = styled(IndeterminateCheckBox)`
  transform: scale(1.3);
`

const ExpandIcon = styled(AddBox)`
  transform: scale(1.3);
`

const useStyles = makeStyles(
  createStyles({
    root: {
      flexGrow: 1,
    },
    expandCollapseAllButton: {
      textDecoration: 'underline',
      color: 'rgb(0, 145, 255)',
      cursor: 'pointer',
      marginLeft: '10px',
    },
    expandCollapseButtonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    dragOver: {
      backgroundColor: '#bdbdbd',
      borderBottomRightRadius: '16px',
      borderTopRightRadius: '16px',
      transition: 'opacity 200ms',
    },
  })
)