import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { createOrganizationApi } from '../../../api/webapi';
import type { CreateOrganizationRequest } from '../../../api/webapi/organizations/types';
import { CREATE_ORGANIZATION_SNACKBAR } from './config';
import { createOrganizationSchema, type CreateOrganizationValidationSchema } from './schema';

const useCreateOrganization = () => {
	const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const { control, handleSubmit, clearErrors } = useForm<CreateOrganizationValidationSchema>({
		resolver: zodResolver(createOrganizationSchema)
	});

	const navigate: NavigateFunction = useNavigate();

	const { mutate: createOrganizationMutate } = useMutation(createOrganizationApi, {
		onSuccess: (response: AxiosResponse<CreateOrganizationRequest>) => {
			setSnackbarOpen(true);
			setTimeout(() => navigate(`${response.headers.location}/projects`), CREATE_ORGANIZATION_SNACKBAR.Duration);
		}
	});

	const onSnackbarCloseHandler = (): void => {
		setSnackbarOpen(false);
	};

	const onSubmitHandler = handleSubmit((data: CreateOrganizationValidationSchema) => {
    setSnackbarOpen(true);
		createOrganizationMutate({
			organizationName: data.organizationName
		});
	});

	return { control, clearErrors, isSnackbarOpen, onSnackbarCloseHandler, onSubmitHandler };
};

export { useCreateOrganization };
