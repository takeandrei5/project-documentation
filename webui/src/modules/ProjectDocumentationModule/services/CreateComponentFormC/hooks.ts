import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { CreateComponentFormValidationSchema } from './schema.ts';
import { createComponentFormSchema } from './schema.ts';

const useCreateComponent = (closeHandler: () => void) => {
	const {
		control,
		handleSubmit,
		getValues,
		reset,
		formState: { errors, dirtyFields, isValid }
	} = useForm<CreateComponentFormValidationSchema>({
		resolver: zodResolver(createComponentFormSchema),
		defaultValues: {
			project: '',
			issue: '',
			componentTitle: '',
			syncWithJira: false
		}
	});
	const onSubmitHandler = handleSubmit((data: CreateComponentFormValidationSchema) => {
		console.log(data);
	});

	const submitCallback = () => {
		const { componentTitle, componentDescription } = getValues();

		if (!isValid) {
			return;
		}

		const callbackResponse = () => {
			console.log('Callback from CreateComponentFormC');
		};

		const payloadMessage = {
			responseMessage: 'DATA_COMPONENT_MODAL',
			callbackResponse: callbackResponse.toString(),
			responseData: { title: componentTitle, content: componentDescription }
		};

		window.postMessage(payloadMessage);
		closeHandler();
	};

	return { control, dirtyFields, errors, isValid, getValues, onSubmitHandler, reset, submitCallback };
};

export default useCreateComponent;
