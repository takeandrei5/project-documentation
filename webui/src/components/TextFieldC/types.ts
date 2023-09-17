export type TextFieldCProps = {
	id:string
	name?:string
	value:unknown
	onChange:(value:unknown) => void
	label:string
	placeholder?:string
	onKeyPress?:(event:React.KeyboardEvent<HTMLInputElement>) => void
	hasError?:boolean
}