import {z} from 'zod';


export const LoginSchema= z.object({
    username: z.string().toLowerCase(),
    password:z.string()
});