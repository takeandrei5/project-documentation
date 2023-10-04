import { FormComponent } from '../services';
import { SnackbarView } from '../views';
import { useSnackbar } from './hooks';

const CreateOrganization: React.FC = () => {
	const { CREATE_ORGANIZATION_CONFIG, isSnackbarOpen, setIsSnackbarOpen } = useSnackbar();

	return (
		<>
			<FormComponent
				id={CREATE_ORGANIZATION_CONFIG.id}
				label={CREATE_ORGANIZATION_CONFIG.label}
				name={CREATE_ORGANIZATION_CONFIG.name}
				title={CREATE_ORGANIZATION_CONFIG.title}
				snackbarDuration={CREATE_ORGANIZATION_CONFIG.snackbarDuration}
				submitButton={CREATE_ORGANIZATION_CONFIG.submitButton}
				setIsSnackbarOpen={setIsSnackbarOpen}
			/>
			<SnackbarView
				duration={CREATE_ORGANIZATION_CONFIG.snackbarDuration}
				isOpen={isSnackbarOpen}
				message={CREATE_ORGANIZATION_CONFIG.snackbarMessage}
				onSnackbarClosedHandler={() => setIsSnackbarOpen(false)}
			/>
		</>
	);
};

export default CreateOrganization;
