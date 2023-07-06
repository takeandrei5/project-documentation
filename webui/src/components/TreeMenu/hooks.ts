import {DraggedTreeNode, TreeNode, TreeViewOrderResult} from './types'

const useDraggableTreeMenu = () => {
  const deleteNode = (node:TreeNode, sourceNodeId:string, parentNodeId:string):boolean => {
    if (node.id === parentNodeId && node.children) {
      node.children = node.children?.filter((x) => x.id !== sourceNodeId)
      return true
    }

    if (node.children) {
      for (let index = 0; index < node.children.length; index++) {
        const isDeleted = deleteNode(node.children[index], sourceNodeId, parentNodeId)
        if (isDeleted) return true
      }
    }

    return false
  }

  const moveNode = (
    node:TreeNode,
    sourceNode:TreeNode,
    destinationNodeId:string
  ):boolean => {
    if (node.id === destinationNodeId) {
      if (!node.children) node.children = []
      const order =
              node.children && node.children.length > 0
                ? node.children[node.children.length - 1].order || 0
                : 0
      sourceNode.order = order + 1
      node.children.push(sourceNode)
      return true
    }

    if (node.children) {
      for (let index = 0; index < node.children.length; index++) {
        const isMoved = moveNode(node.children[index], sourceNode, destinationNodeId)
        if (isMoved) return true
      }
    }

    return false
  }

  const reOrderNodes = (
    node:TreeNode,
    draggedTreeNode:DraggedTreeNode,
    destinationNodeId:string,
    parentNodeIdOfDestinationNode:string,
    addBeforeDestinationNode:boolean
  ):TreeViewOrderResult | null => {
    if (node.id === parentNodeIdOfDestinationNode && node.children && node.children.length > 0) {
      if (draggedTreeNode.parentNode?.id !== parentNodeIdOfDestinationNode) {
        if (!node.children.some((x) => x.id === draggedTreeNode.node.id)) {
          node.children.push(draggedTreeNode.node)
        }
      }

      node.children.sort((a, b) => (a.order || 0) - (b.order || 0))
      const draggedNode = node.children.find((x) => x.id === draggedTreeNode.node.id)
      if (!draggedNode) return {} as TreeViewOrderResult

      for (let index = 0; index < node.children.length; index++) {
        if (node.children[index].id === destinationNodeId) {
          const result = {siblingsOfDraggedTreeNode: [] as TreeNode[]} as TreeViewOrderResult

          draggedNode.order = node.children[index].order || 0

          if (!addBeforeDestinationNode) draggedNode.order++

          result.draggedTreeNodeOrder = draggedNode.order

          for (
            let subIndex = addBeforeDestinationNode ? index : index + 1;
            subIndex < node.children.length;
            subIndex++
          ) {
            if (node.children[subIndex].id !== draggedNode.id) {
              node.children[subIndex].order = (node.children[subIndex].order || 0) + 1
              result.siblingsOfDraggedTreeNode.push(node.children[subIndex])
            }
          }

          return result
        }
      }
    }

    if (node.children) {
      for (let index = 0; index < node.children.length; index++) {
        const result = reOrderNodes(
          node.children[index],
          draggedTreeNode,
          destinationNodeId,
          parentNodeIdOfDestinationNode,
          addBeforeDestinationNode
        )
        if (result) return result
      }
    }

    return null
  }

  return {deleteNode, moveNode, reOrderNodes}
}

export {useDraggableTreeMenu}