import { z } from 'zod';

export const CategorySchema = z.object(
  {
    name: z
      .string({ message: 'Make sure you provide a valid category name.' })
      .min(1, { message: 'Make sure name is not empty.' }),
    parent_id: z
      .number({
        message: 'Make sure you provide a valid category parent_id.',
      })
      .nullable(),
  },
  {
    message: 'Make sure you provide a payload.',
  },
);

export type CreateCategoryDto = z.infer<typeof CategorySchema>;
