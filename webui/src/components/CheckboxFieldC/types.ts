export type CheckboxFieldProps = {
  id:string
  label:string
  name:string
  onChange:(event:React.ChangeEvent) => void
  value:string
  disabled?:boolean
}