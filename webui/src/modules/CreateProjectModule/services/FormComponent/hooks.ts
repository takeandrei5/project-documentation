import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createProjectApi } from '../../../../api';
import type { CreateProjectRequest } from '../../../../api/webapi/projects/types';
import { createProjectSchema, type CreateProjectValidationSchema } from './schema';

const useFormComponent = (setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>, snackbarDuration: number) => {
	const { control, handleSubmit } = useForm<CreateProjectValidationSchema>({
		resolver: zodResolver(createProjectSchema)
	});

	const params = useParams<{ organizationId: string }>();
	const navigate = useNavigate();

	const { mutate: createProjectMutate } = useMutation((data: CreateProjectRequest) => createProjectApi(data, params.organizationId!), {
		onSuccess: (response: AxiosResponse<CreateProjectRequest>) => {
			setSnackbarOpen(true);
			setTimeout(() => navigate(`${response.headers.location}/project-documentation`), snackbarDuration);
		}
	});

	const onSubmitHandler = handleSubmit((data: CreateProjectValidationSchema) => {
		createProjectMutate({
			name: data.projectName
		});
	});

	return { control, onSubmitHandler };
};

export { useFormComponent };
