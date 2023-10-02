import { Box, Paper, Snackbar, type Theme } from '@mui/material';
import { CREATE_ORGANIZATION_SNACKBAR } from './config';
import { useCreateOrganization } from './hooks';
import { CreateOrganizationFormComponent } from '../components';

const CreateOrganizationContainer: React.FC = () => {
	const { control, clearErrors, isSnackbarOpen, onSnackbarCloseHandler, onSubmitHandler } = useCreateOrganization();

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
					<CreateOrganizationFormComponent control={control} handleOnSubmit={onSubmitHandler} clearErrors={clearErrors} />
				</Paper>
			</Box>
			<Snackbar
				autoHideDuration={CREATE_ORGANIZATION_SNACKBAR.Duration.valueOf()}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={isSnackbarOpen}
				onClose={onSnackbarCloseHandler}
				message={CREATE_ORGANIZATION_SNACKBAR.Message}
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

export default CreateOrganizationContainer;
