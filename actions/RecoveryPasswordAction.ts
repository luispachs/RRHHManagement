'use server';
import { RecoveryPasswordSchema } from "@/definitions/RecoveryPasswordSchema";
import { RecoveryPasswordState } from "@/types/ActionsState/RecoveryPasswordState";
import { getDictionary } from "@/dictionaries/dictionaries";
import { cookies } from "next/headers";
import UserRepository from "@/repositories/UserRepository";
import rrhhLoger from "@/lib/logger/RRHHLogger";
import { TokenGenerator } from "@/lib/security/TokenGenerator";
import { User } from "@/types/Models/user";
export default async function Action(state:any,formData:FormData){
    const cookiesList = cookies();
    let lang = 'en';
    if(!cookiesList.has('_locale')){
        lang =cookiesList.get('_locale')!.valueOf() as string;
    }
    const userEmail = formData.get('email')!.valueOf() as string;
    const dictionary = await getDictionary('es');
try{
    const validation = RecoveryPasswordSchema.safeParse({email:userEmail});

    if(!validation.success){
        return {status:400,message:dictionary.recovery_password_page.invalid_format_email};
    }

    const userRepository = new UserRepository();

    const user:User = await userRepository.getUserByEmail(validation.data.email);

    if(user == null){
        return {status:200,message:dictionary.recovery_password_page.successfull_message};
    }
    
    let tokenString = TokenGenerator.generate(`${user.email}_${new Date().toString}_${user.id}`);

    

    return {status:200,message: dictionary.recovery_password_page.successfull_message} as RecoveryPasswordState;
}catch(error){
    rrhhLoger.error(error as Error);
    return {status:500,message:dictionary.errors.exception_500};

}
    
}