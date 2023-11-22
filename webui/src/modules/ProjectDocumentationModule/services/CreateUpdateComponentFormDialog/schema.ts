import { z } from 'zod';

const componentFormSchema = z.object({
  jiraProjectId: z.string().nonempty({ message: 'Project field cannot be empty.' }),
	jiraIssueId: z.string(),
	componentTitle: z.string(),
	componentDescription: z.string(),
	syncWithJira: z.boolean()
});

export { componentFormSchema };
export type ComponentFormValidationSchema = z.infer<typeof componentFormSchema>;
