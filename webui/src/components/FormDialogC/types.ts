import type {DialogControl} from '../DialogC/types.ts'
import {FormEvent} from 'react'

export type FormDialogCProps = {
  control:DialogControl;
  title:string;
  content:React.ReactNode;
  description?:string;
  onSubmitHandler:(event:FormEvent<HTMLElement>) => void;
  submitCallback?:() => void;

}