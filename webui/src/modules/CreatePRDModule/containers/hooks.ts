import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createProjectApi } from '../../../api';
import { prdSchema, type PRDValidationSchema } from './schema';

const useCreatePRDContainer = () => {
	const { control, handleSubmit } = useForm<PRDValidationSchema>({
		resolver: zodResolver(prdSchema)
	});

	const { mutate: createProjectMutate } = useMutation(createProjectApi, {
		onSuccess: (response) => {
			console.log(response);
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
