import { useState } from 'react';

const useSnackbar = () => {
	const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

	const CREATE_PROJECT_CONFIG = {
		id: 'create-project',
		name: 'projectName',
		title: 'Create new project',
		submitButton: 'Confirm',
		label: 'Enter project name',
		placeholder: 'Type your project name',
		snackbarMessage: "Project created successfully! You' ll be redirected shortly ...",
		snackbarDuration: 3000
	};

	return { CREATE_PROJECT_CONFIG, isSnackbarOpen, setIsSnackbarOpen };
};

export { useSnackbar };
