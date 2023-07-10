import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { prdSchema, type PRDValidationSchema } from './schema';

const useCreatePRDContainer = () => {
	const { control, handleSubmit } = useForm<PRDValidationSchema>({
		resolver: zodResolver(prdSchema)
	});

	const onSubmitHandler = handleSubmit((data: PRDValidationSchema) => console.log(data));

	return { control, onSubmitHandler };
};

export { useCreatePRDContainer };
