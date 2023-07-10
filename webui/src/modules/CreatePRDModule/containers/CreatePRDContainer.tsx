import { Box } from '@mui/material';
import { PRDFormComponent } from '../components';
import { useCreatePRDContainer } from './hooks';

const CreatePRDContainer: React.FC = () => {
	const { control, onSubmitHandler } = useCreatePRDContainer();

  return (
		<Box sx={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
			<PRDFormComponent control={control} handleOnSubmit={onSubmitHandler} />
		</Box>
	);
};

export default CreatePRDContainer;
