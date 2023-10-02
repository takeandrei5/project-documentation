import { type FormEvent } from 'react';
import type { UseFormClearErrors, Control } from 'react-hook-form';
import type { CreateOrganizationValidationSchema } from '../containers/schema';

export type CreateOrganizationFormComponentProps = {
	control: Control<CreateOrganizationValidationSchema>;
	clearErrors: UseFormClearErrors<{
		organizationName: string;
	}>;
	handleOnSubmit: (event: FormEvent<HTMLElement>) => void;
};
