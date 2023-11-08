export type FormComponentProps = {
	id: string;
	label: string;
	title: string;
	name: string;
	submitButton: string;
	snackbarDuration: number;
	setIsSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
