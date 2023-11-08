import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { createOrganizationApi } from '../../../../api';
import type { CreateOrganizationRequest } from '../../../../api/webapi/organizations/types';
import { createOrganizationSchema, type CreateOrganizationValidationSchema } from './schema';

const useFormComponent = (setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>, snackbarDuration: number) => {
	const { control, handleSubmit } = useForm<CreateOrganizationValidationSchema>({
		resolver: zodResolver(createOrganizationSchema)
	});

	const navigate: NavigateFunction = useNavigate();

	const { mutate: createOrganizationMutate } = useMutation(createOrganizationApi, {
		onSuccess: (response: AxiosResponse<CreateOrganizationRequest>) => {
			setSnackbarOpen(true);
			setTimeout(() => navigate(`${response.headers.location}/projects`), snackbarDuration);
		}
	});

	const onSubmitHandler = handleSubmit((data: CreateOrganizationValidationSchema) => {
		createOrganizationMutate({
			name: data.organizationName
		});
	});

	return { control, onSubmitHandler };
};

export { useFormComponent };
