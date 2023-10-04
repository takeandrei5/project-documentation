import type { FormEvent } from 'react';
import type { Control } from 'react-hook-form';
import type { CreateProjectValidationSchema } from '../../services/FormComponent/schema';

export type FormComponentViewProps = {
	id: string;
	label: string;
	title: string;
	name: string;
	submitButton: string;
	control: Control<CreateProjectValidationSchema>;
	onSubmitHandler: (event: FormEvent<HTMLElement>) => void;
};
