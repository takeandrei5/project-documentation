export type FetchError = Error & {
	statusCode:number;
}

export type DialogControlProps = {
	isOpen:boolean
	closeHandler:() => void
	openHandler:() => void
}