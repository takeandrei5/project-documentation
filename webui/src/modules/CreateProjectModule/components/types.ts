import { type FormEvent } from 'react';
import type { UseFormClearErrors, Control } from 'react-hook-form';
import type { CreateProjectValidationSchema } from '../containers/schema';

export type CreateProjectFormComponentProps = {
	control: Control<CreateProjectValidationSchema>;
	clearErrors: UseFormClearErrors<{
		projectName: string;
	}>;
	handleOnSubmit: (event: FormEvent<HTMLElement>) => void;
};
