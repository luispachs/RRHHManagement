'use server';
import { RecoveryPasswordSchema } from "@/definitions/RecoveryPasswordSchema";
import { RecoveryPasswordState } from "@/types/ActionsState/RecoveryPasswordState";
import { getDictionary } from "@/dictionaries/dictionaries";
import { cookies } from "next/headers";
export default async function Action(state:any,formData:FormData){
    const cookiesList = cookies();
    const userEmail = formData.get('email')!.valueOf() as string;
    const dictionary = await getDictionary(cookiesList.get('_locale')!.valueOf() as string)
    const validation = RecoveryPasswordSchema.safeParse({email:userEmail});

    if(!validation.success){
        return {status:400,message:dictionary.recovery_password_page.invalid_format_email};
    }

    

    return {status:200,message: "s"} as RecoveryPasswordState;
    
}