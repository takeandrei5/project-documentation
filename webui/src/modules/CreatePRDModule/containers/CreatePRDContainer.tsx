import { Box, Paper } from '@mui/material';
import { PRDFormComponent } from '../components';
import { useCreatePRDContainer } from './hooks';

const CreatePRDContainer:React.FC = () => {
	const { control, onSubmitHandler } = useCreatePRDContainer();

	return (
		<Box sx={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
			<Paper
				sx={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
					gap: '0.75rem',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 350,
					bgcolor: 'background.paper',
					boxShadow: 5,
					p: '1.5rem 2rem',
					borderRadius: '0.5rem',
					outline: 0,
					'& button': {
						padding: '0.75rem 1rem',
						width: '100%',
						mt: '1rem'
					}
				}}
			>
				<PRDFormComponent control={control} handleOnSubmit={onSubmitHandler} />
			</Paper>
		</Box>
	);
};

export default CreatePRDContainer;
