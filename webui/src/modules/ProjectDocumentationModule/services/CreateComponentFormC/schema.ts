import {z} from 'zod'

const createComponentFormSchema = z.object({
  title: z.string().nonempty({message: 'Title field cannot be an empty.'}).min(1, {message: 'Title field must have at least 1 characters.'}),
  projectId: z.string().nonempty({message: 'Project id field cannot be an empty.'}),
})

export {createComponentFormSchema}

export type CreateComponentFormValidationSchema = z.infer<typeof createComponentFormSchema>;
