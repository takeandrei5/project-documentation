import type {DialogControl} from '../DialogC/types.ts'
import type {FormEvent} from 'react'
import type {UseFormReset} from 'react-hook-form'
import type {CreateComponentFormValidationSchema} from '../../modules/ProjectDocumentationModule/services/CreateComponentFormC/schema.ts'

export type FormDialogCProps = {
  control:DialogControl;
  title:string;
  content:React.ReactNode;
  description?:string;
  onSubmitHandler:(event:FormEvent<HTMLElement>) => void;
  submitCallback?:() => void;
  reset:() => UseFormReset<CreateComponentFormValidationSchema>;
}