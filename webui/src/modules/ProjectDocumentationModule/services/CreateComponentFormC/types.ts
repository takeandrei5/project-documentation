import type {Control} from 'react-hook-form'

export type CreateComponentFormCProps = {
  control:Control<CreateComponentFormCProps>
  projectValue?:string
  componentTitleValue?:string
  isComponentTitleDirty?:boolean
}