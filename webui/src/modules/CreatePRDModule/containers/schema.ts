import { z } from 'zod';

const prdSchema = z.object({
	prdName: z.string().nonempty({ message: "Project's name cannot be an empty name." }).min(3, { message: "Project's name must be at least 3 characters." })
});

export { prdSchema };

export type PRDValidationSchema = z.infer<typeof prdSchema>;
