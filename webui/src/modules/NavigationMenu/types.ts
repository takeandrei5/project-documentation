import {Dispatch, SetStateAction} from 'react'

type TreeDataValues = {
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

type TreeDataProps = {
  treeData:TreeDataValues[]
  setTreeData:Dispatch<SetStateAction<TreeDataValues[]>>
}

export {TreeDataValues, TreeDataProps}