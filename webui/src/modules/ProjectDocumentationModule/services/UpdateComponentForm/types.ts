import type { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import type { ComponentFormValidationSchema } from '../CreateUpdateComponentFormDialog/schema';

export type UpdateComponentFormProps = {
	control: Control<ComponentFormValidationSchema>;
	dirtyFields: Partial<
		Readonly<{
			project: boolean;
			issue: boolean;
			componentTitle: boolean;
			componentDescription: boolean;
			syncWithJira: boolean;
		}>
	>;
	getValues: UseFormGetValues<ComponentFormValidationSchema>;
};
