import { z } from 'zod';

const createProjectSchema = z.object({
	projectName: z.string().nonempty({ message: "Projects's name cannot be an empty name." }).min(3, { message: "Project's name must be at least 3 characters." })
});

export { createProjectSchema };

export type CreateProjectValidationSchema = z.infer<typeof createProjectSchema>;
