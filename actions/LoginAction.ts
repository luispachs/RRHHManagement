'use server'
import { FormActionState } from "@/types/FormActionState";
import { LoginSchema } from "@/definitions/LoginSchema";
import { getDictionary } from "@/dictionaries/dictionaries";
import { cookies } from "next/headers";
import UserRepository from "@/repositories/UserRepository";
export default async function Action(state:any,formData:FormData){
    const cookiesList =cookies();
    let currentLang = 'es';
    if(cookiesList.has('_locale')){
        let currentLang= cookiesList.get('_locale');
    }
    const dictionary = await getDictionary(currentLang);
    let username = formData.get('username')?.valueOf() as string;
    let password = formData.get('password')?.valueOf() as string;

    if(username ==null || password==null){
        return {status:400,message:dictionary.login_page.login_error} as FormActionState;
    }

    const validations = LoginSchema.safeParse({
        username:username,
        password:password
    });

    if(!validations.success){
        return {status:400,message:dictionary.login_page.login_error} as FormActionState;
    }
    const userRepository = new UserRepository();

    let user = userRepository.getByUsername(username) ;

    if(user==null){
        return {status:400,message:dictionary.login_page.login_error} as FormActionState;

    }


    return {status:200,message:null} as FormActionState;
}