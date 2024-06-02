import { cookies } from "next/headers";
import { getDictionary as fnDictionary } from "@/dictionaries/dictionaries";
export async function  getDictionary():Promise<any>{
    const cookiesList =cookies();
    let lang = 'en';

    if(cookiesList.has('_locale')){
        lang = cookiesList.get('_locale')?.value as string;
    }

    const dictionary = await fnDictionary(lang);

    return dictionary;
}