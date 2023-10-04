import { FormComponent } from '../services';
import { SnackbarView } from '../views';
import { useSnackbar } from './hooks';

const CreateProject: React.FC = () => {
	const { CREATE_PROJECT_CONFIG, isSnackbarOpen, setIsSnackbarOpen } = useSnackbar();

	return (
		<>
			<FormComponent
				id={CREATE_PROJECT_CONFIG.id}
				label={CREATE_PROJECT_CONFIG.label}
				name={CREATE_PROJECT_CONFIG.name}
				title={CREATE_PROJECT_CONFIG.title}
				snackbarDuration={CREATE_PROJECT_CONFIG.snackbarDuration}
				submitButton={CREATE_PROJECT_CONFIG.submitButton}
				setIsSnackbarOpen={setIsSnackbarOpen}
			/>
			<SnackbarView
				duration={CREATE_PROJECT_CONFIG.snackbarDuration}
				isOpen={isSnackbarOpen}
				message={CREATE_PROJECT_CONFIG.snackbarMessage}
				onSnackbarClosedHandler={() => setIsSnackbarOpen(false)}
			/>
		</>
	);
};

export default CreateProject;
