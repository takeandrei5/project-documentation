import { z } from 'zod';

const createComponentFormSchema = z.object({
	project: z.string().nonempty({ message: 'Project field cannot be empty.' }),
	issue: z.string().nonempty({ message: 'Issue field cannot be empty.' }),
	componentTitle: z.string().nonempty({ message: 'Component title field cannot be empty.' }).min(1, { message: 'Title field must have at least 1 characters.' }),
	componentDescription: z.string(),
	syncWithJira: z.boolean()
});

export { createComponentFormSchema };
export type CreateComponentFormValidationSchema = z.infer<typeof createComponentFormSchema>;
