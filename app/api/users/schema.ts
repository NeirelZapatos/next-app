import { z } from 'zod';

const schema = z.object({
    username: z.string().min(3),
    age: z.number().max(100).optional(),
    email: z.string().email(),
});

export default schema;