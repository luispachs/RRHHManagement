'use server'
import { FormActionState } from "@/types/ActionsState/FormActionState";
import { LoginSchema } from "@/definitions/LoginSchema";
import { getDictionary } from "@/dictionaries/dictionaries";
import { cookies, headers } from "next/headers";
import UserRepository from "@/repositories/UserRepository";
import { User } from "@/types/Models/user";
import {Auth} from "@/lib/security/Auth";
import rrhhLoger from "@/lib/logger/RRHHLogger";

export default async function Action(state:any,formData:FormData){
        const headersList = headers();
        const ip= headersList.get('x-forwarded-for')?.valueOf() as  string; 
        const cookiesList =cookies();
        let currentLang = 'es';
        if(cookiesList.has('_locale')){
            let currentLang= cookiesList.get('_locale');
        }
        const dictionary = await getDictionary(currentLang);
    try{
       
        let username = formData.get('username')?.valueOf() as string;
        let password = formData.get('password')?.valueOf() as string;

        if(username ==null || password==null){
            return {status:400,message:dictionary.login_page.login_error,session:null,token:null} as FormActionState;
        }

        const validations = LoginSchema.safeParse({
            username:username,
            password:password
        });

        if(!validations.success){
            return {status:400,message:dictionary.login_page.login_error,session:null,token:null} as FormActionState;
        }
        const userRepository = new UserRepository();

        let user:User|null = await  userRepository.getByUsername(username) ;

        if(user==null){
            return {status:400,message:dictionary.login_page.login_error,session:null,token:null} as FormActionState;
        }

        let validate = await Auth.auth(user,validations.data.password,ip);
        
        if(validate.status ==500){
            return {status:400,message:dictionary.login_page.login_error,session:null,token:null} as FormActionState;
        }
        
        cookies().set('session',validate.session as string);
        return {status:200,message:dictionary.login_page.login_authorize,session: validate.session,token:validate.token} as FormActionState;

    }catch(error){
        console.log(error);
        return {status:500,message:dictionary.errors.exception_500,session:null,token:null} as FormActionState;
    }
}