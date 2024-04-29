import { cookies } from 'next/headers';
import style from './recovery-password.module.css';
import RecoveryPasswordForm from '@/components/forms/RecoveryPasswordForm';
import { getDictionary } from '@/dictionaries/dictionaries';
export default async function Page(){
    const cookiesList = cookies();

    let currentLang = 'en';
    if( cookiesList.has('_locale')){
        currentLang= cookiesList.get('_locale')?.value as string;
    }

    const dictionary = await getDictionary(currentLang);
    return (
        <main className={style.container}>
            <RecoveryPasswordForm dictionary={dictionary}/>
        </main>
    );
}