import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, type NavigateFunction } from 'react-router-dom';
import { createProjectApi } from '../../../api/webapi';
import { type CreateProjectRequest } from '../../../api/webapi/projects/types';
import { CREATE_PROJECT_SNACKBAR } from './config';
import { createProjectSchema, type CreateProjectValidationSchema } from './schema';

const useCreateProject = () => {
	const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const { control, handleSubmit, clearErrors } = useForm<CreateProjectValidationSchema>({
		resolver: zodResolver(createProjectSchema)
	});

	const params = useParams();
	const navigate: NavigateFunction = useNavigate();

	const { mutate: createProjectMutate } = useMutation((data: CreateProjectRequest) => createProjectApi(data, params['organizationId']!), {
		onSuccess: (response: AxiosResponse<null>) => {
			setSnackbarOpen(true);
			setTimeout(() => navigate(`${response.headers.location}/project-documentation`), CREATE_PROJECT_SNACKBAR.Duration);
		}
	});

	const onSnackbarCloseHandler = (): void => {
		setSnackbarOpen(false);
	};

	const onSubmitHandler = handleSubmit((data: CreateProjectValidationSchema) => {
		setSnackbarOpen(true);
		createProjectMutate({
			name: data.projectName
		});
	});

	return { control, clearErrors, isSnackbarOpen, onSnackbarCloseHandler, onSubmitHandler };
};

export { useCreateProject };
