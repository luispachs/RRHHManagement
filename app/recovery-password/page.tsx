import { cookies } from 'next/headers';
import style from './recovery-password.module.css';
import RecoveryPasswordForm from '@/components/forms/RecoveryPasswordForm';
import { getDictionary } from '@/lib/facade/Dictionary';
export default async function Page(){
  
    const dictionary = await getDictionary();
    return (
        <main className={style.container}>
            <RecoveryPasswordForm dictionary={dictionary}/>
        </main>
    );
}