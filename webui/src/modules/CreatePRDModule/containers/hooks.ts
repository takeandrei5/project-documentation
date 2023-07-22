import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createProjectApi } from '../../../api';
import { prdSchema, type PRDValidationSchema } from './schema';

const useCreatePRDContainer = () => {
	const { control, handleSubmit } = useForm<PRDValidationSchema>({
		resolver: zodResolver(prdSchema)
	});

  const navigate = useNavigate();

	const { mutate: createProjectMutate } = useMutation(createProjectApi, {
		onSuccess: (response: AxiosResponse<null>) => {
      navigate(response.headers.location);
		}
	});

	const onSubmitHandler = handleSubmit((data: PRDValidationSchema) =>
		createProjectMutate({
			projectName: data.projectName
		})
	);

	return { control, onSubmitHandler };
};

export { useCreatePRDContainer };
