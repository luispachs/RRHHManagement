import {z} from 'zod';


export const RecoveryPasswordSchema = z.object(
    {
        email:z.string().email()
    }
);