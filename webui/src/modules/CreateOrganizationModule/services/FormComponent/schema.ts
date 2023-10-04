import { z } from 'zod';

const createOrganizationSchema = z.object({
	organizationName: z.string().nonempty({ message: "Organization's name cannot be an empty name." }).min(3, { message: "Organization's name must be at least 3 characters." })
});

export { createOrganizationSchema };

export type CreateOrganizationValidationSchema = z.infer<typeof createOrganizationSchema>;
