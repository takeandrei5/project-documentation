import type { Control, UseFormGetValues } from 'react-hook-form';
import type { CreateComponentFormValidationSchema } from './schema';

export type CreateComponentFormCProps = {
	control: Control<CreateComponentFormValidationSchema>;
	dirtyFields: Partial<
		Readonly<{
			project: boolean;
			issue: boolean;
			componentTitle: boolean;
			componentDescription: boolean;
			syncWithJira: boolean;
		}>
	>;
	getValues: UseFormGetValues<CreateComponentFormValidationSchema>;
};
