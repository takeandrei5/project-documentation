import { useState } from 'react';

const useSnackbar = () => {
	const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

	const CREATE_ORGANIZATION_CONFIG = {
		id: 'create-organization',
		name: 'organizationName',
		title: 'Create new organization',
		submitButton: 'Confirm',
		label: 'Enter organization name',
		placeholder: 'Type your organization name',
		snackbarMessage: "Organization created successfully! You' ll be redirected shortly ...",
		snackbarDuration: 3000
	};

	return { CREATE_ORGANIZATION_CONFIG, isSnackbarOpen, setIsSnackbarOpen };
};

export { useSnackbar };
