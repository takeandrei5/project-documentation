import { Box, Paper, type Theme } from '@mui/material';
import { FormComponentView } from '../../views';
import { useFormComponent } from './hooks';
import type { FormComponentProps } from './types';

const FormComponent: React.FC<FormComponentProps> = ({ id, label, name, title, submitButton, snackbarDuration, setIsSnackbarOpen }) => {
	const { control, onSubmitHandler } = useFormComponent(setIsSnackbarOpen, snackbarDuration);

	return (
		<Box sx={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
			<Paper
				sx={(theme: Theme) => ({
					width: '26rem',
					bgcolor: theme.palette.common.white,
					boxShadow: 6,
					padding: '1.5rem 2rem',
					borderRadius: '0.5rem'
				})}>
				<FormComponentView id={id} label={label} name={name} title={title} submitButton={submitButton} control={control} onSubmitHandler={onSubmitHandler} />
			</Paper>
		</Box>
	);
};

export default FormComponent;
