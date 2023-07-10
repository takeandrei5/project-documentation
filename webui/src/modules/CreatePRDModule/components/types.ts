import type { FormEvent } from 'react';
import type { Control } from 'react-hook-form';
import type { PRDValidationSchema } from '../containers/schema';

export type PRDFormComponentProps = {
	control: Control<PRDValidationSchema>;
	handleOnSubmit: (event: FormEvent<HTMLElement>) => void;
};
