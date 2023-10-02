import { Box, Paper, Snackbar, type Theme } from '@mui/material';
import { CreateProjectFormComponent } from '../components';
import { CREATE_PROJECT_SNACKBAR } from './config';
import { useCreateProject } from './hooks';

const CreateProjectContainer: React.FC = () => {
	const { control, clearErrors, isSnackbarOpen, onSnackbarCloseHandler, onSubmitHandler } = useCreateProject();

	return (
		<>
			<Box sx={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
				<Paper
					sx={(theme: Theme) => ({
						width: '26rem',
						bgcolor: theme.palette.common.white,
						boxShadow: 6,
						padding: '1.5rem 2rem',
						borderRadius: '0.5rem',
					})}>
					<CreateProjectFormComponent control={control} handleOnSubmit={onSubmitHandler} clearErrors={clearErrors} />
				</Paper>
			</Box>
			<Snackbar
				autoHideDuration={CREATE_PROJECT_SNACKBAR.Duration.valueOf()}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={isSnackbarOpen}
				onClose={onSnackbarCloseHandler}
				message={CREATE_PROJECT_SNACKBAR.Message}
				key='bottom-center'
				sx={{
					'div.MuiSnackbarContent-message': {
						fontSize: '1rem'
					}
				}}
			/>
		</>
	);
};

export default CreateProjectContainer;
